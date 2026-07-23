const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function resetPassword() {
    const email = 'shardulgosawi@gmail.com';
    const newPassword = 'password123'; // User's requested reset
    
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gentle_reminder');
        console.log('Connected to MongoDB');
        
        const user = await User.findOne({ email });
        if (!user) {
            console.error(`User ${email} not found!`);
            process.exit(1);
        }
        
        user.password = newPassword; // The pre-save hook in models/User.js will hash it
        await user.save();
        
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        console.log('--- PLEASE SIGN IN NOW ---');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

resetPassword();
