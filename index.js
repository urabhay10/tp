const express = require('express');
const cors = require('cors');
const socket = require('socket.io');  

const Port = 3001;

const app = express();
app.use(cors());  
app.use(express.json());

const server = require('http').createServer(app);
const io = socket(server, {
    cors: {
        origin: '*',
    },
    autoConnecct: false,
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('SendMessage', (data) => {
        console.log('message', data);
        data.sender = 'user2';
        socket.emit('ReceiveMessage', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
});

server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});