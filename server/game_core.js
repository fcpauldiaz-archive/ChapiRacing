import Player from '../client/player';

export default class Game {
  constructor(id, players, playerCount)  {
    this.id = id;
    this.players = players;
    this.numberAvailable = [2, 3, 4];
    this.team1Type = ['bomber', 'car'];
    this.team2Type = ['bomber', 'car'];
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

  removeObject(object_id) {
    for (let i = 0; i < this.objectsArray.length; i++) {
      object = this.objectsArray[i];
      if (object.getId() === object_id) {
        //remove object from array
        this.objectsArray.splice(i, 1);
        //nothing else to do;
        break;
      }
    }
  }

  updateObject(object_id, pos_x, pos_y) {
    for (let i = 0; i < this.objectsArray.length; i++) {
      object = this.objectsArray[i];
      if (object.getId() === object_id) {
         object.updatePos(pos_x, pos_y);
        //nothing else to do;
        break;
      }
    }
  }

  getObects() {
    return this.objects;
  }

  getObjectsLength() {
    return this.objects.length;
  }
  //use when player is added
  getPlayerNumber() {
    //console.log(this.numberAvailable, "number");
    return this.numberAvailable.shift();
  }
  //use when player retires from game
  addNumber(number) {
    //console.log(number+1, "unshift");
    //inserts at first position
    this.numberAvailable.unshift(number+1);
    this.numberAvailable = this.numberAvailable.sort();
  }

   getPlayerType(player_id) {
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if (player.getPlayerId() === player_id) {
        if (player.getTeam() === 1) {
          return this.team1Type.shift();
        }
        if (player.getTeam() === 2) {
          return this.team2Type.shift();
        }
      }
    }
    return -1; //should get here, error
  }

}