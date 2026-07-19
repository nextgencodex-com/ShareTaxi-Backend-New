const express = require('express');
const router = express.Router();
const {
  getAllSafariParks,
  createSafariPark,
  updateSafariPark,
  deleteSafariPark
} = require('../controllers/safariParkController');

router.get('/', getAllSafariParks);
router.post('/', createSafariPark);
router.put('/:id', updateSafariPark);
router.delete('/:id', deleteSafariPark);

module.exports = router;
