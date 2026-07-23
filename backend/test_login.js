const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'shardulgosawi@gmail.com',
            password: 'password123' // I don't know the real password, but I'll see what the server says
        });
        console.log('Login Success:', response.status);
    } catch (err) {
        console.log('Login Error:', err.response?.status, err.response?.data?.message);
    }
}

testLogin();
