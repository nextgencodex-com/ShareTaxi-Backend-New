const SafariPark = require('../models/SafariPark');

// Get all safari parks
const getAllSafariParks = async (req, res) => {
  try {
    const parks = await SafariPark.getAll();
    res.json({
      success: true,
      count: parks.length,
      data: { parks }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new safari park
const createSafariPark = async (req, res) => {
  try {
    const { name, ratePerPerson, image } = req.body;

    if (!name || ratePerPerson === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and ratePerPerson are required'
      });
    }

    const park = await SafariPark.create({
      name,
      ratePerPerson: Number(ratePerPerson),
      image
    });

    res.status(201).json({
      success: true,
      data: { park }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a safari park
const updateSafariPark = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updateData = { ...req.body };
    if (updateData.ratePerPerson !== undefined) {
      updateData.ratePerPerson = Number(updateData.ratePerPerson);
    }

    const updatedPark = await SafariPark.update(id, updateData);
    
    res.json({
      success: true,
      data: { park: updatedPark }
    });
  } catch (error) {
    if (error.message === 'Safari park not found') {
      return res.status(404).json({
        success: false,
        message: 'Safari park not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a safari park
const deleteSafariPark = async (req, res) => {
  try {
    const { id } = req.params;
    
    await SafariPark.softDelete(id);
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllSafariParks,
  createSafariPark,
  updateSafariPark,
  deleteSafariPark
};
