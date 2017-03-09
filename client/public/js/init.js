const socket = io();

$( "#join" ).click(function() {
  var id_server = $('#id_server').val();
  if (id_server !== undefined) {
     $('#contact').remove();
    $('#delete').remove();
    $('#footer').remove();
    $("#game").css('visibility', 'visible');
    socket.emit('joinGame', {id_server});
  }
  console.log('empty')

});

$( "#create" ).click(function() {
  var create = true;
  $('#contact').remove();
  $('#delete').remove();
  $('#footer').remove();
  $("#game").css('visibility', 'visible');
  socket.emit('createGame', {});
});