/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();

// creating http server
const server = http.createServer(app);

// creating socket object
const io = socketIO(server);

const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/admin/error');

const ADMIN = '/';

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ADMIN, adminRoutes);
app.use(errorController.get404);

const activeUsers = new Set();
let roomId = '';

// Creating connection for socket

// A socket is one endpoint of a two-way communication
// link between two programs running on the network.
// ... An endpoint is a combination of an IP address and a port number.

io.on('connection', (socket) => {
  console.log('on connection');
  socket.on('JOIN_ROOM', (room) => {
    console.log('on JOIN_ROOM');
    roomId = room;
    socket.join(room);
  });

  // To emit an event from your client, use the emit function on
  // the socket object
  // To handle these events, use the on function on the socket
  // object on your server.
  // Sent an event from the client!

  // Creating event NEW_MESSAGE for sending the message
  // NEW_MESSAGE will be used in front-end to send msgs

  socket.on('NEW_MESSAGE', (msg) => {
    console.log('on NEW_MESSAGE');
    io.to(roomId).emit('NEW_MESSAGE', msg);
  });

  // To disconnect participant from chat
  // It will also remove specific user from object
  socket.on('disconnect', () => {
    console.log('on disconnect');
    activeUsers.delete(socket.userId);

    // Triggering the event user disconnects
    io.to(roomId).emit('user disconnected', socket.userId);
  });
});

const PORT = process.env.PORT || 3000;
console.log('Server listening on PORT: ', PORT);
server.listen(PORT);
