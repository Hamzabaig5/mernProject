const NotificationService = require('../../services/NotificationService');
const express = require('express');
const router = express.Router();

const Reservation = require('../../models/reservation');

// Create a reservation
router.post('/', async (req, res) => {
  const { user, room, startDate, endDate } = req.body;

  try {
    const reservation = new Reservation({
      user,
      room,
      startDate,
      endDate,
    });

    await reservation.save();

    // Send confirmation email using SendGrid
    NotificationService.sendEmail(
      user.email,
      'Reservation Confirmation',
      'Your reservation has been confirmed.'
    );

    // Send SMS using Twilio
    NotificationService.sendSMS(
      user.phone,
      'Your reservation has been confirmed.'
    );

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Modify a reservation
router.put('/:id', async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.startDate = startDate;
      reservation.endDate = endDate;

      await reservation.save();
      res.json(reservation);
    } else {
      res.status(404).json({ msg: 'Reservation not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Cancel a reservation
router.put('/cancel/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.status = 'cancelled';

      await reservation.save();
      res.json(reservation);
    } else {
      res.status(404).json({ msg: 'Reservation not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a user's reservation history
router.get('/history/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId });

    if (!reservations) {
      return res
        .status(404)
        .json({ msg: 'No reservations found for this user' });
    }

    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
