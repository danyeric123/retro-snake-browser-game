export default class Food{
  constructor(growFactor=1){
    this.growFactor = growFactor
    this.isEaten= false
  }

  toggleEaten(){
    this.isEaten=!this.isEaten
  }

  get getGrowFactor(){
    return this.growFactor
  }

  set setGrowFactor(newFactor){
    this.growFactor= newFactor
  }

}