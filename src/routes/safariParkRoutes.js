const express = require('express');
const router = express.Router();
const {
  createSafariPark,
  getAllSafariParks,
  getSafariParkById,
  updateSafariPark,
  deleteSafariPark
} = require('../controllers/safariParkController');

router.get('/', getAllSafariParks);
router.get('/:parkId', getSafariParkById);
router.post('/', createSafariPark);
router.put('/:parkId', updateSafariPark);
router.delete('/:parkId', deleteSafariPark);

module.exports = router;
