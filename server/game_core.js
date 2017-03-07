import Player from '../client/player';

export default class Game {
  constructor(id, players, playerCount)  {
    this.id = id;
    this.players = players;
    this.numberAvailable = [2, 3, 4];
    this.objectsArray = [];
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
    this.addNumber(index);
    this.decreasePlayerCount();
  }

  addPlayer(id) {
    this.increasePlayerCount();
    const playerNum = this.getPlayerNumber();
    this.players.push(new Player(id, playerNum));
    return playerNum;
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

  addObject(object) {
    this.objectsArray.push(object);
  }

  getObects() {
    return this.objects;
  }

  getObjectsLength() {
    return this.objects.length;
  }
  //use when player is added
  getPlayerNumber() {
    console.log(this.numberAvailable, "number");
    return this.numberAvailable.shift();
  }
  //use when player retires from game
  addNumber(number) {
    console.log(number+1, "unshift");
    //inserts at first position
    this.numberAvailable.unshift(number+1);
    this.numberAvailable = this.numberAvailable.sort();
  }

}