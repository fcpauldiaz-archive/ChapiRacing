var socket = io('http://localhost:4004');

socket.on('onconnected', (data) => {
    console.log(data);
});

socket.emit('team-select', () => { 
  
});