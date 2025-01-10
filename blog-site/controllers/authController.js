const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public/auth/login.html"));
  } catch (error) {
    res.status(500).json({ error: "Failed to load login page" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    res.sendFile(path.join(__dirname, "../public/dashboard/main.html"));
  } catch (error) {
    res.status(500).json({ error: "Failed to verify user" });
  }
};
