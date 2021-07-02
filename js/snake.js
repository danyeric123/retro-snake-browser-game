import Food from './food.js';

export default class Snake{
  constructor(startPosition, direction, speed=1){
    this.positions = [{x:startPosition.x,y:startPosition.y}]
    this.speed = speed
    this.isDead = false
    this.direction = direction
  }
  move(delta=this.direction){
    let newHead = {
      x: this.getHead.x + delta.x, 
      y: this.getHead.y + delta.y
    };
    if(this.touchSelf(newHead)){
      this.isDead =true
    }else{
      this.positions.unshift(newHead);
      this.positions.pop()
    }
  }

  touchSelf(newPosition){
    return this.positions.some(position=>
      (position.x === newPosition.x)&&
      (position.y === newPosition.y))
  }

  size(){
    return this.positions.length
  }

  get getHead(){
    return this.positions[0]
  }

  toggleIsDead(){
    this.isDead = !this.isDead
  }

  eat(){
    let oldTail = {...this.positions[this.positions.length-1]}
    this.positions.push(oldTail)

    // Grow factor from food can be implemented later once MVP is set up
    // Grow factor can be done as follows: Array(growFactor).fill(oldTail)

  }
}

// addSegments() {
//   for (let i = 0; i < newSegments; i++) {
//     snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
//   }