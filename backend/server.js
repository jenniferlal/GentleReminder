const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gentle_reminder')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Gentle Reminder API is running...');
});

// Models and Routes will be imported here
const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');
const appointmentRoutes = require('./routes/appointments');
app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/appointments', appointmentRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
