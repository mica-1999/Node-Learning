const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connect to MongoDB using Mongoose
require('./config/db');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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