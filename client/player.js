export default class Player  {
  constructor(id, number) {
    //console.log(number, 'player number');
    this.playerId = id;
    this.playerNumber = number;
    this.playerTeam =  -1;
    this.teamSelected = false;
    this.playerPoints =  0;
    this.type = '';
    this.posx;
    this.posy;
  }

  setPlayerType(type) {
    this.type = type;
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

  getInitialX() {
    if (this.playerTeam === 1 && this.type === 'car') {
      return 65;
    }
    else if (this.playerTeam === 2 && this.type === 'car') { //team 2 car
      return 450;
    }
    else if (this.playerTeam === 1 && this.type === 'bomber') {
      return 55;
    }
    else { //team === 2 && type === 'bomber'
      return 440;
    }
  }

}
