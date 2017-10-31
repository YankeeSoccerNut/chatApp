const http = require('http');
const express = require('express');
var app = express();
const server = http.createServer(app);
var socketio = require('socket.io');

//socketio does have a queue but we're going to build our own for now....
var users = [];

// automatically serve up anything in the public folder from where I am....
app.use(express.static(__dirname + '/public'));

server.listen(8080);
var io = socketio.listen(server);  // listen to the listener
// .on is listen
// .emit is send

io.sockets.on('connect', (socket)=>{
  console.log("Someone connected via a socket");
  // All Event Listeners Go Here....
  socket.on('nameToServer', (data)=>{
    var clientInfo = {
      name: data,
      clientId: socket.id
    };
    users.push(clientInfo);
    io.sockets.emit('newUser', users);
  }); // nameToServer

  socket.on('messageToServer',(messageObject)=>{
    console.log('forwarding message to ALL clients');

    io.sockets.emit('messageToClient', messageObject);
  }); // messageToServer
});  // io.sockets.on

console.log("Server listening on port 8080");
console.log("And io is listening to the listener...for websocket traffic");
