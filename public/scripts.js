// console.log("sanity check for sockets");

$(document).ready(()=>{
  // set the route to piggyback on
  socketUrl = 'http://127.0.0.1:8080';

  socketio = io.connect(socketUrl);

  var name = prompt("What is your name?");

  // now we can send this to the server...
  // 2 args...Event (we make up), Data to send
  socketio.emit('nameToServer', name);
  socketio.on('newUser', (users)=>{
    var usersHTML = "";
    users.map((user)=>{
      console.log(`${user.name} just joined`);
      usersHTML += (`<div class="col-sm-12">${user.name}</div>`)
    });
    $('#users').html(usersHTML);
  });  // on 'newUser'

  $('#submit-message').submit((event)=>{
    //prevent the page from submitting..
    event.preventDefault();

    //Get the value from the input box
    var newMessage = $('#new-message').val();
    console.log(newMessage);

    //Send message via websocket...
    socketio.emit('messageToServer', {
      name: name,
      message: newMessage
    });
  }); // submit-message

  // handle message back to us...
  socketio.on('messageToClient', (messageObject)=>{
      $('#messages').prepend(`<p>${messageObject.message} -- ${messageObject.name}</p>`);
  }); // messageToClient
}); //document.ready
