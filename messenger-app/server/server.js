const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const logger = require('./utils/logger');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Messenger App Server is running');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    // Handle joining chat
    socket.on('join', (username) => {
        socket.username = username;
        logger.info(`${username} joined the chat`);
        io.emit('userJoined', `${username} joined the chat`);
    });

    // Handle chat messages
    socket.on('message', (data) => {
        try {
            logger.info(`Message from ${socket.username}: ${data.message}`);
            io.emit('message', {
                id: Date.now(),
                username: socket.username,
                message: data.message,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            logger.error(`Error handling message: ${error.message}`);
        }
    });

    // Handle typing status
    socket.on('typing', (isTyping) => {
        socket.broadcast.emit('userTyping', {
            username: socket.username,
            isTyping
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        if (socket.username) {
            logger.info(`${socket.username} disconnected`);
            io.emit('userLeft', `${socket.username} left the chat`);
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
