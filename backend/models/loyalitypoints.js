const mongoose = require('mongoose');

const LoyaltyPointSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = LoyaltyPoint = mongoose.model(
  'loyaltyPoint',
  LoyaltyPointSchema
);
