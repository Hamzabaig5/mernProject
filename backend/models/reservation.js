const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['reserved', 'cancelled'],
    default: 'reserved',
  },
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);
