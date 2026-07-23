const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
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

// Get all appointments for a user
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an appointment
router.post('/', auth, async (req, res) => {
    try {
        const { doctorName, specialty, date, time, clinicAddress, notes } = req.body;
        const newAppointment = new Appointment({
            userId: req.userId,
            doctorName,
            specialty,
            date,
            time,
            clinicAddress,
            notes,
        });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an appointment
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        if (appointment.userId.toString() !== req.userId) return res.status(401).json({ message: 'Unauthorised' });

        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
