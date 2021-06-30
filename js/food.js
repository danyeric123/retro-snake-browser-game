export default class Food{
  constructor(growFactor){
    this.growFactor = growFactor
  }

  get getGrowFactor(){
    return this.growFactor
  }

  set setGrowFactor(newFactor){
    this.growFactor= newFactor
  }

}