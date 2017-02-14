function Player(data) {
  this.playerId = data.id;
  this.playerNumber =  data.player;
  this.playerTeam =  1;
  this.playerPoints =  0;
  this.posx;
  this.posy;

  Player.prototype.getPlayerNumber = function() {
    return this.playerNumber;
  }

  Player.prototype.getTeam = function() {
    return this.playerTeam;
  };

  Player.prototype.setTeam = function(team) {
    this.palyerTeam = team;
  };

  Player.prototype.increasePoints = function() {
    this.playerPoints =+ 1;
  };

  Player.prototype.getPoints = function() {
    return this.playerPoints;
  };

  Player.prototype.updatePos = function(x, y) {
    this.posx = x;
    this.posy = y;
  }

  Player.prototype.getPost = function() {
    return {posx, posy};
  }
}
 
module.exports = Player;
