const express = require('express');
const router = express.Router();
const {
  getAllSafariRides,
  createSafariRide,
  updateSafariRide,
  deleteSafariRide
} = require('../controllers/safariRideController');

router.get('/', getAllSafariRides);
router.post('/', createSafariRide);
router.put('/:id', updateSafariRide);
router.delete('/:id', deleteSafariRide);

module.exports = router;

