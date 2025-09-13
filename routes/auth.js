const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Let schema handle hashing
    const newUser = new User({ email, password });
    await newUser.save();

    console.log("✅ Registered new user:", email);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password using schema method
    const isMatch = await user.comparePassword(password);
    console.log("👉 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", email);

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;