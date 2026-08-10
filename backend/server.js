import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rsvpRoutes from './routes/rsvpRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/garden_romance';

app.use(cors());
app.use(express.json());

app.locals.isMongoConnected = false;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
    app.locals.isMongoConnected = true;
  })
  .catch((err) => {
    console.log('ℹ️ MongoDB not connected. Running in-memory mode for RSVPs.');
    app.locals.isMongoConnected = false;
  });

// API Routes
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/rsvps', rsvpRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    template: 'Garden Romance',
    mongoConnected: app.locals.isMongoConnected,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
