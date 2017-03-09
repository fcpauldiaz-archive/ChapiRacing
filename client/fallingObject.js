import UUID from 'uuid';

export default class FallingObject {

  constructor(object) {
    this.id = object.id;
    this.type = object.type;
    this.x = object.x;
    this.y = object.y;
  }
  
  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }
  setType(type){
    this.type = type;
  }
  updatePos(x, y){
    this.x = x;
    this.y = y;
  }
  getPos() {
    return {x: this.x, y: this.y};
  }


}



