
export const FallingObject = (type) => {
  this.type = type
  this.posx;
  this.posy;

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



