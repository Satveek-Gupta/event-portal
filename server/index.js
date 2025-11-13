require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('node:crypto');

const PORT = process.env.PORT || 3001;
const DATA_FILE = path.resolve(__dirname, 'attendees.json');

const app = express();

app.use(cors());
app.use(express.json());

async function readAttendees() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

async function writeAttendees(attendees) {
  await fs.writeFile(DATA_FILE, JSON.stringify(attendees, null, 2), 'utf-8');
}

app.get('/api/attendees', async (req, res) => {
  try {
    const attendees = await readAttendees();
    res.json(attendees);
  } catch (error) {
    console.error('Error reading attendees:', error);
    res.status(500).json({ message: 'Unable to load attendees.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { fullName, email, club, role, comments } = req.body || {};

  if (!fullName || !email || !club || !role) {
    return res.status(400).json({ message: 'fullName, email, club, and role are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  try {
    const attendees = await readAttendees();

    const alreadyRegistered = attendees.some(
      (attendee) => attendee.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyRegistered) {
      return res.status(409).json({ message: 'This email has already been registered.' });
    }

    const newAttendee = {
      id: crypto.randomUUID(),
      fullName,
      email,
      club,
      role,
      comments: comments || '',
      registeredAt: new Date().toISOString()
    };

    attendees.push(newAttendee);
    await writeAttendees(attendees);

    res.status(201).json(newAttendee);
  } catch (error) {
    console.error('Error saving attendee:', error);
    res.status(500).json({ message: 'Unable to save registration.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
