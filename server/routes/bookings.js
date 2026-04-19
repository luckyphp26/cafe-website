const express = require('express');
const router  = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings — save a new booking
router.post('/', async (req, res) => {
  try {
    const { firstName, phone, date, guests } = req.body;
    if (!firstName || !phone || !date || !guests || Number(guests) < 1) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    const booking = await Booking.create({ firstName, phone, date, guests: Number(guests) });
    res.status(201).json({ message: 'Table booked successfully!', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings — list all bookings (admin use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
