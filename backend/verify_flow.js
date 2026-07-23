const axios = require('axios');

async function verifyLoginFlow() {
    const email = `test_${Date.now()}@example.com`;
    const password = 'Password@123';
    const name = 'Verify User';
    
    try {
        console.log('--- Step 1: Registering User ---');
        const reg = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        console.log('Registration:', reg.data.message);
        
        console.log('--- Step 2: Logging In ---');
        const log = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (log.status === 200 && log.data.token) {
            console.log('Login: Success ✅');
            console.log('User Name:', log.data.user.name);
        } else {
            console.error('Login: Failed ❌');
        }
    } catch (err) {
        console.error('Error:', err.response?.data?.message || err.message);
    }
}

verifyLoginFlow();
