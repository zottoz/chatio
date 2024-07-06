const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let contador = 0;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        contador++;
        io.emit('chat message', msg);
        if(contador>3){
            io.emit('alerta', 'passou de 3 msg');
            contador = 0;
        }
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
