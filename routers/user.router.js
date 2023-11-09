

const express = require('express');
const bcrypt = require('bcrypt');
const {UserModel} = require("../models/user.model")
const jwt = require('jsonwebtoken')
const UserRouter = express.Router();


UserRouter.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

  
    const existingUser = await UserModel.find({ email });
   
    if (existingUser.length) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 8);

   
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

   
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//login UserRouter

UserRouter.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
     
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'AirTicket', { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = {UserRouter};
