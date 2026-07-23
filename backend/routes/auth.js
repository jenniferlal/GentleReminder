const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for: ${email}`);
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User ${email} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.password) {
            return res.status(400).json({ message: 'This account uses Google Sign-In. Please use the Google button.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Login failed: Invalid password for ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });
        console.log(`Login successful for: ${email}`);
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(`Login error for ${email}:`, err.message);
        res.status(500).json({ error: err.message });
    }
});

// Google Sign-In / Sign-Up
router.post('/google', async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ message: 'ID token is required' });

        // Verify token with Google
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        console.log(`Google sign-in attempt for: ${email}`);

        // Find existing user or create new one
        let user = await User.findOne({ email });

        if (user) {
            // Update googleId if they previously registered with email
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // Create new Google user (no password)
            user = new User({
                name,
                email,
                googleId,
                avatar: picture || '',
            });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });
        console.log(`Google sign-in successful for: ${email}`);
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        console.error('Google sign-in error:', err.message);
        res.status(401).json({ message: 'Google authentication failed. Please try again.' });
    }
});

module.exports = router;
