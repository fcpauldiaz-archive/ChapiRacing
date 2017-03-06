export default class Player  {
  constructor(id) {
    this.playerId = id;
    this.playerNumber++;
    this.playerTeam =  -1;
    this.teamSelected = false;
    this.playerPoints =  0;
    this.posx;
    this.posy;
  }


  getPlayerId() {
    return this.playerId;
  }

  getPlayerNumber() {
    return this.playerNumber;
  }

  getTeam() {
    return this.playerTeam;
  };

  setTeam(team) {
    this.playerTeam = team;
  };

  increasePoints() {
    this.playerPoints =+ 1;
  };

  getPoints() {
    return this.playerPoints;
  };

  updatePos(x, y) {
    this.posx = x;
    this.posy = y;
  }

  getPos() {
    return {x: this.posx, y: this.posy};
  }

  setTeamSelected(selected) {
    this.teamSelected = selected;
  };

  getTeamSelected() {
    return this.teamSelected;
  }

}
