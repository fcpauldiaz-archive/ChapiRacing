/**
 * Server Management
 * Newton Labs
 * 5/02/2017
 */

const serverGame = module.exports = { games: [], game_count:0 };
import UUID from 'uuid';
import Player from '../client/player';

serverGame.createGame = function(playerId, playerNumber) {
  var actualGame = {
    id : UUID(),                          //generate a new id for the game
    players: [new Player(playerId, playerNumber)],             //list of players
    player_count: 1   
  };
  //Store it in the list of game
  this.games.push(actualGame);
  //Keep track
  this.game_count++;
  //return game id
  return actualGame.id;
}

serverGame.joinGame = function(i, id, number) {
  this.games[i].players.push(new Player(id, number));
  this.games[i].player_count++;
  //return game id;
  return this.games[i].id;
}

serverGame.leaveGame = function(i, indexPlayer) {
  this.games[i].players.splice(indexPlayer, 1);
  this.games[i].player_count--;
}

serverGame.findGame = function(playerId, playerNumber) {
  //create first game
  if (this.game_count === 0) {
    return this.createGame(playerId, playerNumber);
  }
  //find for an existing game
  for (let i = 0; i < this.games.length; i++) {
    const count = this.games[i].player_count;
    if (count <= 3) {
      return this.joinGame(i, playerId, playerNumber);
    }
  }
  //if all games are full
  return this.createGame(playerId, playerNumber);
}

serverGame.endGame = function (playerId) {
  if (this.game_count !== 0) {
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      for (let j = 0; j < game.players.length; j++) {
        let player = game.players[j];
        if (player.getPlayerId() === playerId) {
          this.leaveGame(i, player);
          if (game.player_count === 0) {
            this.games.splice(game, 1);
            this.game_count--;
          }
        }
      }//end inner for
    }//end outer for
  } 
}

serverGame.updatePlayerPosition = function(playerUpdate) {
  for (let i = 0; i < this.games.length; i++) {
    let game = this.games[i];
    for (let j = 0; j < game.players.length; j++) {
      let player = game.players[j];
      if (player.getPlayerId() === playerUpdate.id) {
        player.updatePos(playerUpdate.x, playerUpdate.y);
      }
    }//end inner for
  }//end outer for
}

serverGame.getPlayersPosition = function(game_id, user_id) {
  let players = [];
  for (let i = 0; i < this.games.length; i++) {
    let game = this.games[i];
    if (game.id === game_id) {
      for (let j = 0; j < game.players.length; j++) {
        let playerObj = new Object();
        let player = game.players[j];
        if (player.getPlayerId() !== user_id) {
          let pos = player.getPos();
          playerObj.x = pos.x;
          playerObj.y = pos.y;
          playerObj.number = player.getPlayerNumber();
          playerObj.team = -1;
          players.push(playerObj);
        }
      }//end inner for
    }// end if game_id
  }//end outer for
  return players;
}