
const express = require('express');
const {BookingModel} = require('../models/booking.model');
const {UserModel} = require('../models/user.model');
const {FlightModel} = require('../models/flight.model');

const BookingRouter = express.Router();

// POST /api/booking
BookingRouter.post('/api/booking', async (req, res) => {
  try {
    const { userId, flightId } = req.body;

    
    const user = await UserModel.findById(userId);
    const flight = await FlightModel.findById(flightId);

    if (!user || !flight) {
      return res.status(404).json({ error: 'User or Flight not found' });
    }


    const newBooking = new BookingModel({
      user: user._id,
      flight: flight._id,
    });

   
    await newBooking.save();

    return res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/dashboard
BookingRouter.get('/api/dashboard', async (req, res) => {
    try {
    
      const bookings = await BookingModel.find().populate('user flight');
  
      return res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  BookingRouter.put('/api/dashboard/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { userId, flightId } = req.body;
  
     
      await BookingModel.findByIdAndUpdate(bookingId, { userId, flightId });
  
       res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  BookingRouter.delete('/api/dashboard/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
  
      await BookingModel.findByIdAndDelete(bookingId);
  
      return res.status(202).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = {BookingRouter};
