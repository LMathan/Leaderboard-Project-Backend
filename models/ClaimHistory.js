const mongoose = require('mongoose');

const claimHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  userName: String,
  pointsClaimed: Number,
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClaimHistory', claimHistorySchema);