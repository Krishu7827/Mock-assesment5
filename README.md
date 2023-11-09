# Air Ticket Booking Backend

This is the backend for an Air Ticket Booking system built using Node.js, Express.js, and MongoDB (NEM) stack.

## Features

- **User Registration and Login**
  - `POST /api/register`: Allows users to register. Passwords are hashed before storing.
  - `POST /api/login`: Allows users to login. Returns a JWT token on successful login.

- **Flight Management**
  - `GET /api/flights`: Returns a list of all available flights.
  - `GET /api/flights/:id`: Returns the details of a specific flight identified by its ID.
  - `POST /api/flights`: Allows users to add new flights to the system.
  - `PUT / PATCH /api/flights/:id`: Allows users to update the details of a specific flight identified by its ID.
  - `DELETE /api/flights/:id`: Allows users to delete a specific flight identified by its ID.

- **Booking Management**
  - `POST /api/booking`: Allows users to book flights.

- **Dashboard**
  - `GET /api/dashboard`: Lists all bookings with user and flight details.
  - `PUT/PATCH /api/dashboard/:id`: Allows users to edit/update a booking.
  - `DELETE /api/dashboard/:id`: Allows users to delete a booking.

## Setup

1. Install Node.js and npm.
2. Clone this repository.
3. Install dependencies: `npm install`.
4. Set up your MongoDB connection in `server.js`.
5. Run the server: `node server.js`.


