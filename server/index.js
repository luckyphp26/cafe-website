require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./db');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews',  require('./routes/reviews'));
app.use('/api/contact',  require('./routes/contact'));

// ─── Health Check ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Pastry World server running — MongoDB connected!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
