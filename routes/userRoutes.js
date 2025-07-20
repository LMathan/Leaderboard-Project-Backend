const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a new user
router.post('/users', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

// Claim points
router.post('/claim', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findById(userId);
  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({
    userId: user._id,
    userName: user.name,
    pointsClaimed: points,
  });
  await history.save();

  res.json({ message: 'Points claimed', points });
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Claim history
router.get('/history', async (req, res) => {
  const history = await ClaimHistory.find().sort({ claimedAt: -1 });
  res.json(history);
});

module.exports = router;