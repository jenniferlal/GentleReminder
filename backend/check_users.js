const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gentle_reminder');
        console.log('Connected to MongoDB');
        const users = await User.find({});
        console.log('Total users:', users.length);
        users.forEach(user => {
            console.log(`- name: ${user.name}, email: ${user.email}`);
        });
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUsers();
