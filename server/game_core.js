import Player from '../client/player';

export default class Game {
  constructor(id, players, playerCount)  {
    this.id = id;
    this.players = players;
    this.playerCount = playerCount;
  }
  
  getId() {  
    return this.id; 
  }

  increasePlayerCount() {
    this.playerCount++;
  }

  decreasePlayerCount() {
    this.playerCount--;
  }

  removePlayer(index) {
    this.players.splice(index, 1);
    this.decreasePlayerCount();
  }

  addPlayer(id, number) {
    this.players.push(new Player(id, number));
    this.increasePlayerCount();
  }

  getPlayers() {
    return this.players;
  }

  findPlayer(index) {
    return this.players[index];
  }

  getPlayerCount() {
    return this.playerCount;
  }


}