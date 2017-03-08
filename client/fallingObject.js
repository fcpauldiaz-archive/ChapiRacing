import UUID from 'uuid';

export const FallingObject = (posx, posy) => {
  this.id = UUID();
  this.type
  this.posx = posx;
  this.posy = posy;

  getId = () => {
    return this.id;
  }

  getType = () => {
    return this.type;
  }
  setType = (type) => {
    this.type = type
  }
  updatePos = (x, y) => {
    this.posx = x;
    this.posy = y;
  }
  getPos = () => {
    return {x: this.posx, y: this.posy};
  }


}



