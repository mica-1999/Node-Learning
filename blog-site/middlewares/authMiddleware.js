module.exports = (req, res, next) => {
  // Placeholder for actual authentication logic
  const isAuthenticated = true; // Replace with real authentication check

  if (isAuthenticated) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
