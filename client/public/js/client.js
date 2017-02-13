var socket = io('http://192.168.0.37:4004');

socket.on('onconnected', function(data) {
    console.log(data);
});

socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', 'tobi', function (data) {
        console.log(data); // data will be 'woot'
    });
});
