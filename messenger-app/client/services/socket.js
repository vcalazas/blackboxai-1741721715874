import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

class SocketService {
    socket = null;
    
    connect() {
        this.socket = io(SOCKET_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Send a message
    sendMessage(message) {
        if (this.socket) {
            this.socket.emit('message', { message });
        }
    }

    // Join chat
    joinChat(username) {
        if (this.socket) {
            this.socket.emit('join', username);
        }
    }

    // Update typing status
    updateTyping(isTyping) {
        if (this.socket) {
            this.socket.emit('typing', isTyping);
        }
    }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
