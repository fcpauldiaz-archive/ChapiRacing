var socket = io('http://localhost:4004');

socket.on('onconnected', (data) => {
    console.log(data.game);
    player = new Player(data);
    console.log(player);
});

socket.emit('team-select', () => { 
  
});