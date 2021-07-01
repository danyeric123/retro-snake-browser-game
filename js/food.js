export default class Food{
  constructor(growFactor=1){
    this.growFactor = growFactor
    this.eaten= false
  }

  toggleEaten(){
    this.eaten=!this.eaten
  }

  get getGrowFactor(){
    return this.growFactor
  }

  set setGrowFactor(newFactor){
    this.growFactor= newFactor
  }

}