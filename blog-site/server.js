const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
require('dotenv').config();

// Connect to MongoDB using Mongoose
require('./config/db');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 1 hour session expiry
}));

// Configure flash messages
app.use(flash());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/auth', require('./routes/authRoutes'));

// Authentication middleware
const authMiddleware = require('./middlewares/authMiddleware');
app.use('/posts', authMiddleware, require('./routes/postRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});