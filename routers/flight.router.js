

const express = require('express');
const {FlightModel} = require('../models/flight.model');

const FlightRouter = express.Router();

// POST /api/flights
FlightRouter.post('/api/flights', async (req, res) => {
  try {
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;

  
    const newFlight = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });

    
    await newFlight.save();

    return res.status(200).json({ message: 'Flight added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/flights
FlightRouter.get('/api/flights', async (req, res) => {
    
try{
    
     
     const flight = await FlightModel.find({});

      return res.status(200).json(flight);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // PUT /api/flights/:id
FlightRouter.put('/api/flights/:id', async (req, res) => {
    try {
      const flightId = req.params.id;
      const {
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      } = req.body;
  
    
      await FlightModel.findByIdAndUpdate(flightId,{
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      } );
  
      res.send({
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // DELETE /api/flights/:id
  FlightRouter.delete('/api/flights/:id', async (req, res) => {
    try {
      const flightId = req.params.id;
  
     
      await FlightModel.findByIdAndDelete(flightId);
  
      return res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = {FlightRouter};
