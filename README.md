# Gentle Reminder App

A full-stack React Native (Expo) and Node.js application for setting and managing medical and general reminders.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally, or use a MongoDB Atlas URI)
- [Expo Go app](https://expo.dev/client) installed on your physical mobile device, OR an Android Emulator/iOS Simulator set up on your machine.

---

## 1. Backend Setup

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration:
   Check if a `.env` file exists in the `backend` folder. If not, create one and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gentle_reminder
   JWT_SECRET=your_super_secret_jwt_key
   ```
   *(Ensure your local MongoDB instance is running, or replace the URI with your Atlas string.)*

4. Start the backend server:
   ```bash
   node server.js
   ```
   You should see a message indicating that the server is running on port 5000 and successfully connected to MongoDB.

---

## 2. Frontend Setup

1. Open a **new** terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. **CRITICAL STEP: API URL Configuration**
   The mobile app needs to know where the backend server is running. You must point it to your machine's correct IP address.
   
   - Open `frontend/src/services/api.js`.
   - Update the `BASE_URL` variable according to how you are testing the app:
     - **Physical Device (Expo Go on same Wi-Fi):** Use your machine's local IPv4 address (e.g., `http://192.168.1.x:5000/api`).
     - **Android Emulator:** Use `http://10.0.2.2:5000/api`.
     - **iOS Simulator:** Use `http://localhost:5000/api`.

4. Start the Expo development server:
   ```bash
   npm start
   ```

5. Run the mobile application:
   - **On a Physical Device:** Scan the QR code displayed in the terminal using the Expo Go mobile app (ensure both devices are on the exact same Wi-Fi network).
   - **On Virtual Devices:** Press `a` in the terminal for Android Emulator, or `i` for iOS Simulator.

---

## Troubleshooting

- **App stuck on "Loading" or "Network Error":** Triple check that the `BASE_URL` in `api.js` is correct, make sure the backend is running, and verify that your PC firewall isn't blocking port 5000.
- **Metro Bundler issues:** Try running `npm start -- -c` to clear the cache.
