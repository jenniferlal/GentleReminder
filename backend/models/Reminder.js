const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['Medication', 'Walk', 'Appointment', 'Meeting', 'Custom'], default: 'Custom' },
    time: { type: String, required: true },
    days: [{ type: String }],
    completed: { type: Boolean, default: false },
    lastCompleted: { type: Date },
    notificationId: { type: String, default: null }, // Expo local notification identifier
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reminder', reminderSchema);
