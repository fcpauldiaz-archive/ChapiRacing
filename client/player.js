export default class Player  {
  constructor(id, number) {
    //console.log(number, 'player number');
    this.playerId = id;
    this.number = number;
    this.team =  -1;
    this.teamSelected = false;
    this.points =  0;
    this.type = '';
    this.x;
    this.y;
  }

  setPlayerType(type) {
    this.type = type;
  }

  getPlayerId() {
    return this.playerId;
  }

  getPlayerNumber() {
    return this.number;
  }

  getTeam() {
    return this.team;
  };

  setTeam(team) {
    this.team = team;
  };

  increasePoints() {
    this.points =+ 1;
  };

  getPoints() {
    return this.points;
  };

  updatePos(x) {
    this.x = x;
  }

  getPos() {
    return {x: this.x, y: this.y};
  }

  setTeamSelected(selected) {
    this.teamSelected = selected;
  };

  getTeamSelected() {
    return this.teamSelected;
  }

  setInitialX() {
    if (this.team === 1 && this.type === 'car') {
      this.x = 65;
      return;
    }
    if (this.team === 2 && this.type === 'car') { //team 2 car
      this.x =  450;
      return;
    }
    if (this.team === 1 && this.type === 'bomber') {
      this.x =  440;
      return
    }
    if  (this.team === 2 && this.type === 'bomber'){
      this.x =  55;
      return;
    }
    console.log(this.team)
    console.log(this.type);
    console.log('no debería llegar aqui');
  }


}
