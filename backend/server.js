const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());
// Static files (This will automatically serve index.html for the root)
app.use(express.static(path.join(__dirname, 'public')));

// API Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'FuelNow API is healthy and connected to Frontend' });
});

// Real-time connections
io.on('connection', (socket) => {
    console.log('User/Partner connected:', socket.id);
    socket.on('updateLocation', (data) => {
        io.emit(`locationUpdate_${data.partnerId}`, data);
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 FuelNow Unified Server running at http://localhost:${PORT}`));
