const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  initials:    { type: String },
  avatarBg:    { type: String },
  avatarColor: { type: String },
  location:    { type: String, default: 'Jaipur' },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  dish:        { type: String, default: 'General' },
  date:        { type: String },
  text:        { type: String, required: true, minlength: 15 },
  verified:    { type: Boolean, default: false },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
