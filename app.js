/**
 * Newton Labs
 * App Entry file
 * 5/02/2017
 */
import io from 'socket.io';
import express from 'express';
import UUID from 'uuid';
import http from 'http';

const port = process.env.PORT || 4004;
const app = express();
const server = http.createServer(app);
const debug = false;

server.listen(port);

//Log something so we know that it succeeded.
console.log('Express -> listening on ' + port );

//main index.html file
app.get( '/', ( req, res ) => {
  console.log('loading %s', __dirname + '/index.html');
  res.sendfile( '/index.html' , { root:__dirname });
});


//send assets, files, images, css, javascript
app.get( '/*' , ( req, res, next ) => {
    //This is the current file they have requested
    var file = req.params[0];
    //show requested files.
    if(verbose) console.log('\t :: Express :: file sent : ' + file);
    //send files
    res.sendfile( __dirname + '/' + file );
});

const socket = io.listen(server);
  //Socket.io will make connections
  socket.sockets.on('connection', (client) => {
        
  //Generate a new UUID
  //and store this on their socket/connection
  client.userid = UUID();

  //tell player he is connected with id
  client.emit('onconnected', { id: client.userid } );

}); //client.on 