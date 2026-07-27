const express = require('express');
const router = express.Router();
const {
  getAllSafariRides,
  getSafariRidesByLocation,
  getSafariRideById,
  createSafariRide,
  updateSafariRide,
  deleteSafariRide,
  bookSafariRideSeat
} = require('../controllers/safariRideController');

// Get all shared rides
router.get('/', getAllSafariRides);

// Search shared rides by location
router.get('/search', getSafariRidesByLocation);

// Get a specific shared ride
router.get('/:rideId', getSafariRideById);

// Create a new shared ride
router.post('/', createSafariRide);

// Update a shared ride
router.put('/:rideId', updateSafariRide);

// Delete a shared ride
router.delete('/:rideId', deleteSafariRide);

// Book a seat in shared ride
router.post('/:rideId/book', bookSafariRideSeat);

module.exports = router;