/**
 * Server Management
 * Newton Labs
 * 5/02/2017
 */
const serverGame = module.exports = { games: [], game_count:0 };
import UUID from 'uuid';

serverGame.createGame = function(player) {
  var actualGame = {
    id : UUID(),                   //generate a new id for the game
    players: [player.userid],             //list of players
    player_count: 1   
  };

  //Store it in the list of game
  this.games.push(actualGame);
  //Keep track
  this.game_count++;
}

serverGame.joinGame = function(i, player) {
  this.games[i].players.push(player.userid);
  this.games[i].player_count++;
}

serverGame.leaveGame = function(i, player) {
  this.games[i].players.splice(player, 1);
  this.games[i].player_count--;
}

serverGame.findGame = function(player) {
  if (this.game_count === 0) {
    this.createGame(player);
    return;
  }
  let joined = false;
  for (let i = 0; i < this.games.length; i++) {
    const count = this.games[i].player_count;
    if (count <= 3) {
      this.joinGame(i, player);
      joined = true;
    }
  }
  if (joined === false) {
    this.createGame(player);
  }
}

serverGame.endGame = function (playerId) {
  if (this.game_count !== 0) {
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      for (let j = 0; j < game.players.length; j++) {
        let player = game.players[j];
        if (player === playerId) {
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