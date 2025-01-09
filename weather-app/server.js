// Import required modules
const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// GET: Retrieve weather for a specific city
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = "748b1725eb344bbba94125734250901"; // Replace with your actual API key
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});