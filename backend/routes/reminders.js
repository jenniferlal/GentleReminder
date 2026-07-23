const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all reminders for a user
router.get('/', auth, async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.userId });
        res.status(200).json(reminders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a reminder
router.post('/', auth, async (req, res) => {
    try {
        const { title, category, time, days } = req.body;
        const newReminder = new Reminder({
            userId: req.userId,
            title,
            category,
            time,
            days,
        });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a reminder (toggle completed)
router.patch('/:id', auth, async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
        if (reminder.userId.toString() !== req.userId) return res.status(401).json({ message: 'Unauthorised' });

        const updatedReminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        res.status(200).json(updatedReminder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a reminder
router.delete('/:id', auth, async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
        if (reminder.userId.toString() !== req.userId) return res.status(401).json({ message: 'Unauthorised' });

        await Reminder.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
