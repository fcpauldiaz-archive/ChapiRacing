var Player = function(id, player) {
  this.playerId = id;
  this.playerNumber =  player;
  this.playerTeam =  1;
  this.playerPoints =  0;
  this.posx;
  this.posy;

  Player.prototype.getPlayerId = function() {
    return this.playerId;
  }

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
