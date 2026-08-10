import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  attending: {
    type: String,
    required: [true, 'Attendance selection is required'],
    enum: ['yes', 'no', 'maybe'],
  },
  guestsCount: {
    type: Number,
    default: 1,
    min: 1,
    max: 10,
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RSVP = mongoose.model('RSVP', rsvpSchema);
export default RSVP;
