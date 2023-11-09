const express = require('express');
const mongoose = require('mongoose');
const {UserRouter} = require("./routers/user.router")
const {FlightRouter} = require("./routers/flight.router")
const {BookingRouter} = require("./routers/booking.router")
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())
require("dotenv").config()
const PORT = process.env.PORT || 3000;
// MongoDB connection
mongoose.connect(`${process.env.MongoURL}`);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/users",UserRouter)
app.use(FlightRouter)
app.use(BookingRouter)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
