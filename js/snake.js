import Food from './food.js';

export default class Snake{
  constructor(startPosition, direction, speed=1){
    this.positions = [{x:startPosition.x,y:startPosition.y}]
    this.speed = speed
    this.isDead = false
    this.direction = direction
  }
  move(delta=this.direction){
    let head = {
      x: this.positions[0].x + delta.x, 
      y: this.positions[0].y + delta.y
    };
    this.positions.unshift(head);
    this.positions.pop()
  }

  get getHead(){
    return this.positions[0]
  }

  get isDead(){
    return this.isDead
  }

  toggleIsDead(){
    this.isDead = !this.isDead
  }

  turn(turnDirection){
    let newHead = {
      x: this.positions[0].x + turnDirection.x, 
      y: this.positions[0].y + turnDirection.y
    };
    if(this.positions.includes(newHead)){
      this.isDead =true
    }else{
      this.positions.unshift(head);
      this.positions.pop()
    }
    this.direction = turnDirection
  }
  eat(){
    let oldTail = this.positions[this.positions.length-1]
    this.positions.push(oldTail)

    // Grow factor from food can be implemented later once MVP is set up

  }
}

// addSegments() {
//   for (let i = 0; i < newSegments; i++) {
//     snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
//   }