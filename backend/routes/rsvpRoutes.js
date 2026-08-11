import express from 'express';
import RSVP from '../models/RSVP.js';

const router = express.Router();

// Fallback in-memory storage if MongoDB is not connected
export const memoryStore = [
  {
    _id: '1',
    name: 'Emily & Liam',
    email: 'emily@example.com',
    attending: 'yes',
    guestsCount: 2,
    message: 'Wishing you both a lifetime of happiness, love, and laughter! Can’t wait to celebrate your big day! 💕✨',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    _id: '2',
    name: 'Uncle David',
    email: 'david@example.com',
    attending: 'yes',
    guestsCount: 2,
    message: 'Congratulations Dr. Usama & Dr. Anoosha! So proud of you both. Blessing you with infinite joy and peace.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: '3',
    name: 'Sophia Chen',
    email: 'sophia@example.com',
    attending: 'yes',
    guestsCount: 1,
    message: 'The invitation is so breathtaking! Counting down the days until November 30th! 🎉💐',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

// GET /api/rsvps - Fetch all guest wishes / RSVPs
router.get('/', async (req, res) => {
  try {
    let rsvps = [];
    if (req.app.locals.isMongoConnected) {
      rsvps = await RSVP.find().sort({ createdAt: -1 });
    } else {
      rsvps = [...memoryStore].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    res.json({ success: true, count: rsvps.length, data: rsvps });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve RSVPs' });
  }
});

// POST /api/rsvp - Submit a new RSVP
router.post('/', async (req, res) => {
  try {
    const { name, email, attending, guestsCount, message } = req.body;

    if (!name || !email || !attending) {
      return res.status(400).json({
        success: false,
        error: 'Please provide required fields: name, email, and attending status.',
      });
    }

    let newRsvp;

    if (req.app.locals.isMongoConnected) {
      newRsvp = await RSVP.create({
        name,
        email,
        attending,
        guestsCount: Number(guestsCount) || 1,
        message: message || '',
      });
    } else {
      newRsvp = {
        _id: String(Date.now()),
        name,
        email,
        attending,
        guestsCount: Number(guestsCount) || 1,
        message: message || '',
        createdAt: new Date().toISOString(),
      };
      memoryStore.unshift(newRsvp);
    }

    res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully!',
      data: newRsvp,
    });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    res.status(500).json({ success: false, error: 'Server error saving RSVP' });
  }
});

export default router;
