const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log("✅ Registered new user:", email); // debug

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email); // debug
      return res.status(404).json({ error: 'User not found' });
    }

    // Debug logs
    console.log("👉 Plain password entered:", password);
    console.log("👉 Stored hash in DB:", user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("✅ Login successful for:", email); // debug

    res.status(200).json({
      message: 'Login successful',
      userId: user._id
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;