const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');

const AVATAR_PALETTE = [
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#e0f2fe', color: '#0369a1' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#d1fae5', color: '#065f46' },
  { bg: '#ede9fe', color: '#5b21b6' },
  { bg: '#fee2e2', color: '#991b1b' },
  { bg: '#ecfdf5', color: '#047857' },
];

// GET /api/reviews — fetch all reviews (newest first)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews — save a new review
router.post('/', async (req, res) => {
  try {
    const { name, location, dish, rating, text } = req.body;

    if (!name || !rating || !text || text.trim().length < 15) {
      return res.status(400).json({ error: 'Name, rating, and a review of at least 15 characters are required.' });
    }

    // Auto-generate initials + avatar colours
    const count   = await Review.countDocuments();
    const palette = AVATAR_PALETTE[count % AVATAR_PALETTE.length];
    const initials = name.trim().split(' ').map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('');
    const today   = new Date();
    const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    const review = await Review.create({
      name: name.trim(),
      initials,
      avatarBg: palette.bg,
      avatarColor: palette.color,
      location: location?.trim() || 'Jaipur',
      rating: Number(rating),
      dish: dish || 'General',
      date: dateStr,
      text: text.trim(),
      verified: false,
      featured: false,
    });

    res.status(201).json({ message: 'Review posted!', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
