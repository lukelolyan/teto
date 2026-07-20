const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the HTML file when users visit the page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle real-time chat messages
io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    // Simply forward the message data (text + senderId) to everyone
    io.emit('chat message', data);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});