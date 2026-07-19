const SafariRide = require('../models/SafariRide');

const getAllSafariRides = async (req, res) => {
  try {
    const rides = await SafariRide.getAll();
    res.json({
      success: true,
      count: rides.length,
      data: { rides }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createSafariRide = async (req, res) => {
  try {
    const { parkId, parkName, date, time, people, price, customerName, customerEmail, customerPhone, specialRequests, status } = req.body;

    if (!parkId || !date || !time || !people) {
      return res.status(400).json({
        success: false,
        message: 'parkId, date, time and people are required'
      });
    }

    const ride = await SafariRide.create({
      parkId,
      parkName,
      date,
      time,
      people: Number(people),
      price: Number(price || 0),
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
      status: status || 'Pending'
    });

    res.status(201).json({
      success: true,
      data: { ride }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateSafariRide = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.people !== undefined) updateData.people = Number(updateData.people);
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);

    const ride = await SafariRide.update(id, updateData);

    res.json({
      success: true,
      data: { ride }
    });
  } catch (error) {
    const status = error.message === 'Safari ride not found' ? 404 : 500;
    res.status(status).json({
      success: false,
      message: error.message
    });
  }
};
const deleteSafariRide = async (req, res) => {
  try {
    const { id } = req.params;
    await SafariRide.softDelete(id);

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
  getAllSafariRides,
  createSafariRide,
  updateSafariRide,
  deleteSafariRide
};



