const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  try {
    const messages = req.flash('error');
    res.sendFile(path.join(__dirname, "../public/auth/login.html"), { messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to load login page" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      req.flash('error', 'User Not Found');
      return res.redirect('/auth/login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      req.flash('error', 'Incorrect Password');
      return res.redirect('/auth/login');
    }

    // Create session
    req.session.user = user;

    res.sendFile(path.join(__dirname, "../public/dashboard/main.html"));
  } catch (error) {
    res.status(500).json({ error: "Failed to verify user" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.redirect('/auth/login');
  });
};
