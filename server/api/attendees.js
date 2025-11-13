require('dotenv').config();
const { readAttendees } = require('../utils/data');

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const attendees = await readAttendees();
    res.json(attendees);
  } catch (error) {
    console.error('Error reading attendees:', error);
    const errorMessage = error.message || 'Unable to load attendees.';
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

