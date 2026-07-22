const SafariPark = require('../models/SafariPark');

const createSafariPark = async (req, res) => {
  try {
    const { name, ratePerPerson, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    const parkData = {
      name,
      ratePerPerson: ratePerPerson || '0',
      image: image || '/images/default-safari.jpg'
    };

    const newPark = await SafariPark.create(parkData);

    res.status(201).json({
      success: true,
      message: 'Safari park created successfully',
      data: { park: newPark }
    });
  } catch (error) {
    console.error('Error creating safari park:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create safari park',
      error: error.message
    });
  }
};

const getAllSafariParks = async (req, res) => {
  try {
    const parks = await SafariPark.getAll();
    res.status(200).json({
      success: true,
      data: { parks }
    });
  } catch (error) {
    console.error('Error fetching safari parks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch safari parks',
      error: error.message
    });
  }
};

const getSafariParkById = async (req, res) => {
  try {
    const { parkId } = req.params;
    const park = await SafariPark.getById(parkId);
    res.status(200).json({
      success: true,
      data: { park }
    });
  } catch (error) {
    console.error('Error fetching safari park:', error);
    if (error.message === 'Safari park not found') {
      res.status(404).json({ success: false, message: 'Safari park not found' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to fetch safari park', error: error.message });
    }
  }
};

const updateSafariPark = async (req, res) => {
  try {
    const { parkId } = req.params;
    const updateData = req.body;
    const updatedPark = await SafariPark.update(parkId, updateData);
    res.status(200).json({
      success: true,
      message: 'Safari park updated successfully',
      data: { park: updatedPark }
    });
  } catch (error) {
    console.error('Error updating safari park:', error);
    res.status(500).json({ success: false, message: 'Failed to update safari park', error: error.message });
  }
};

const deleteSafariPark = async (req, res) => {
  try {
    const { parkId } = req.params;
    await SafariPark.delete(parkId);
    res.status(200).json({
      success: true,
      message: 'Safari park deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting safari park:', error);
    res.status(500).json({ success: false, message: 'Failed to delete safari park', error: error.message });
  }
};

module.exports = {
  createSafariPark,
  getAllSafariParks,
  getSafariParkById,
  updateSafariPark,
  deleteSafariPark
};
