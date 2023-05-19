const express = require('express');
const router = express.Router();

const LoyaltyPoint = require('../../models/LoyaltyPoint');

// Get loyalty points for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const loyaltyPoints = await LoyaltyPoint.findOne({
      user: req.params.userId,
    });

    if (!loyaltyPoints) {
      return res.status(404).json({ msg: 'Loyalty points not found' });
    }

    res.json(loyaltyPoints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update loyalty points for a specific user
router.put('/:userId', async (req, res) => {
  const { points } = req.body;

  try {
    let loyaltyPoints = await LoyaltyPoint.findOne({ user: req.params.userId });

    if (!loyaltyPoints) {
      loyaltyPoints = new LoyaltyPoint({
        user: req.params.userId,
        points,
      });

      await loyaltyPoints.save();
    } else {
      loyaltyPoints.points = points;
      await loyaltyPoints.save();
    }

    res.json(loyaltyPoints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete loyalty points for a specific user
router.delete('/:userId', async (req, res) => {
  try {
    await LoyaltyPoint.findOneAndRemove({ user: req.params.userId });

    res.json({ msg: 'Loyalty points deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
