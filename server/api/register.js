require('dotenv').config();
const { createAttendee, findAttendeeByEmail } = require('../utils/data');

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, club, role, comments } = req.body || {};

  if (!fullName || !email || !club || !role) {
    return res.status(400).json({ message: 'fullName, email, club, and role are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  try {
    const existingAttendee = await findAttendeeByEmail(email);
    
    if (existingAttendee) {
      return res.status(409).json({ message: 'This email has already been registered.' });
    }

    const newAttendee = await createAttendee({
      fullName,
      email: email.toLowerCase(),
      club,
      role,
      comments: comments || '',
      registeredAt: new Date(),
    });

    res.status(201).json(newAttendee);
  } catch (error) {
    console.error('Error saving attendee:', error);
    
    if (error.message === 'This email has already been registered.' || error.code === '23505') {
      return res.status(409).json({ message: 'This email has already been registered.' });
    }
    
    if (error.message.includes('Supabase') || error.message.includes('connection') || error.message.includes('SUPABASE')) {
      return res.status(500).json({ 
        message: 'Database connection error. Please check your Supabase configuration.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    res.status(500).json({ 
      message: 'Unable to save registration.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

