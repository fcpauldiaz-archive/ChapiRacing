/**
 * Newton Labs
 * App Entry file
 * 5/02/2017
 */
import socket from 'socket.io';
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
  if (debug) {
    console.log('loading %s', __dirname + '/index.html');
  }
  res.sendFile( '/index.html' , { root:__dirname });
});


//send assets, files, images, css, javascript
app.get( '/*' , ( req, res, next ) => {
    //This is the current file they have requested
    var file = req.params[0];
    //show requested files.
    if (debug) {
      console.log('Express :: file sent : ' + file);
    }
    //send files
    res.sendFile( __dirname + '/' + file );
});

const io = socket.listen(server);
const maxCons = 4;

const getPlayerNumber = (before) => {
  if (before === undefined) return 1;
  if (before === maxCons) {
    return 1;
  }
  return before + 1;
}

 const game_server = require('./server/server.js');
 let playerNumber = undefined;
  //Socket.io will make connections

io.sockets.on('connection', (client) => {
        
  //Generate a new UUID
  //and store this on their socket/connection
  client.userid = UUID();
  playerNumber = getPlayerNumber(playerNumber);
  client.player = playerNumber;
  const game_id = game_server.findGame(client);
  console.log('\t socket.io:: player ' + client.userid + ' connected');
  //tell player he is connected with id
  client.emit('onconnected', { 
    id: client.userid, 
    player: client.player, 
    game: game_server,
    game_id  
  });

  client.on('team-select', (player) => {

  })

  // Add a disconnect listener
  client.on('disconnect', () => {
    console.log('client disconnected ' + client.userid);
    game_server.endGame(client.userid);
  });

}); //client.on 

