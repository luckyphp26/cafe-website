const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact — save a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const contact = await Contact.create({ name, email, mobile, message });
    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contact — list all messages (admin use)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
