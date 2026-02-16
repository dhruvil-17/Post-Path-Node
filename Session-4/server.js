const express = require('express');
const app = express();
const port = 3000;
const http = require('http')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        console.log("client says" , data);   
    });
    socket.on('typing', (data) => {
        console.log("client is typing" , data);   
    });
    socket.emit('reply', 'Hello from server');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});