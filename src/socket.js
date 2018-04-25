var socket = io();

$(document).ready(function(){
  var name = localStorage.getItem("name");
  $('#user').val(name);
});

$('form').submit(function() {
  var from = $('#user').val();
  var message = $('#mesg').val();
  console.log(from);
  console.log(message);
  socket.emit('message', from, message);
  $("#mesg").val('');
  return false;
});

socket.on('message',function(from, message) {
  console.log("from  "+from + "   message   "+ message);
  $('#messages').append($('<li><b>' + from + ' : </b>' + message + '</li>'));
});

socket.on('notifyTyping',function(from) {
  console.log("notify  "+from);
  if(from != $('#user').val()){
  $('#notifyUser').text(from + ' is typing');
}
  setTimeout(function(){
    $('#notifyUser').text('');
  }, 1700);
})

function notifyTyping(){
    var from = $('#user').val();
    socket.emit('notifyTyping',from);
}
