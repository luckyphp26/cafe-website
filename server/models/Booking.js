const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  phone:     { type: String, required: true, trim: true },
  date:      { type: String, required: true },
  guests:    { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
