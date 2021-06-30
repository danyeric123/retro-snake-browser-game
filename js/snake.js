import Food from './food.js';

export default class Snake{
  constructor(startPosition, direction, speed=1){
    this.positions = [{x:startPosition.x,y:startPosition.y}]
    this.speed = speed
    this.isDead = false
    this.direction = direction
  }
  move(){
    let head = {
      x: this.positions[0].x + this.direction.x, 
      y: this.positions[0].y + this.direction.y
    };
    this.positions.unshift(head);
    this.positions.pop()
  }
  turn(turnDirection){
    let head = {
      x: this.positions[0].x + turnDirection.x, 
      y: this.positions[0].y + turnDirection.y
    };
  }
  eat(){
    let oldTail = this.positions[this.positions.length-1]
    this.positions.push(oldTail)

    // Grow factor from food can be implemented later once MVP is set up

  }
}