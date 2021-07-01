import Snake from './snake.js';
import Food from './food.js';

/*-------------------------------- Constants / Variables --------------------------------*/
const UP = { x: 0, y:-1 },
      DOWN = { x: 0, y: 1 },
      RIGHT  = { x: 1, y: 0 },
      LEFT  = { x:-1, y: 0 },
      DIR = [UP,DOWN,RIGHT,LEFT]

const boardSize = 32

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
// Should I make an array of objects that maps the keys with directions?

let keyPress,
    score,
    food,
    randomDirection,
    foodPosition,
    snake,
    snakeHead

/*------------------------ Cached Element References ------------------------*/
let gameBoardSection = document.getElementById("game-board")
const board = createGameBoard(gameBoardSection, boardSize),
      instructions = document.getElementById("instructions")

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("keydown",userInput)

/*-------------------------------- Functions --------------------------------*/


function init(){
  instructions.innerText = ""
  score = 0
  randomDirection = DIR[Math.floor(Math.random()*DIR.length)]
  console.log("before initialization")
  snake = new Snake(getRandomPosition(),randomDirection)
  food = new Food()
  board.forEach(row=>row.forEach(cell=>cell.className="cell"))
  renderFood()
  //Here be game while loop
  let interval = setInterval(()=>{
    updateState()
    if(snake.isDead){
      clearInterval(interval)
    }
    render()
  },500/snake.speed)
}

function updateState(){
  !keyPress?snake.move():snake.move(keyPress)
  snakeHead = snake.getHead
  if(withinBounds(snakeHead)){
      // console.log(`snake position: ${JSON.stringify(snake.positions)}`)
      // console.log(`food position: ${JSON.stringify(foodPosition)}`)
      // console.log((snakeHead.x == foodPosition.x) && 
      //   (snakeHead.y == foodPosition.y))
      
      // console.log("\n")
      if((snakeHead.x == foodPosition.x) && 
        (snakeHead.y == foodPosition.y)){
          snake.eat()
          food.toggleEaten()
          console.log("eaten")
        }
    }else{
      snake.toggleIsDead()
    }
}

/* ------------------------- RENDER FUNCTIONS ------------------------------------- */

function render(){
  if(food.isEaten) renderFood()
  if(!snake.isDead){
    renderSnake()
  }else{
    renderEndGame()
  }
}

function renderFood(){
  console.log(food.isEaten)
  if(food.isEaten){
    board[foodPosition.y][foodPosition.x].className = "cell"
    food.toggleEaten()
  }
  foodPlacement()
  board[foodPosition.y][foodPosition.x].className = "food"

    //Think of refactoring the food position into Food class
}

function renderSnake(){
  let prevSnakeCells = document.querySelectorAll(".snake")
  prevSnakeCells.forEach(cell=>cell.className = "cell")
  for(let position of snake.positions){
    board[position.y][position.x].className = "snake"
  }
}

function renderEndGame(){
  instructions.innerText="You Died! Press Space Bar to Play Again"
}

/* ------------------ EVENT LISTENER FUNCTIONS ----------------------------------- */

function userInput(e){
  switch(e.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "down"
      keyPress = DOWN
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "up"
      keyPress = UP;
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      keyPress = LEFT;
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      keyPress = RIGHT;
      break;
    case "Space":
      init();
      break;
  }
}

/*------------------------- HELPER FUNCTIONS  ------------------------------------------------*/


function getRandomPosition(){
  return {
    x: Math.floor(Math.random()*boardSize),
    y: Math.floor(Math.random()*boardSize)
  }
}

function updateScore(){
  score = (snake.size-1)
}

function withinBounds(position){
  return (position.y>-1 && position.y < boardSize)&&
         (position.x>-1 && position.x < boardSize)
}

function foodPlacement(){
  do{
    foodPosition=getRandomPosition()
  }while(snake.positions.includes(foodPosition))
}

//Refactor the code for checking whether lastInputDir is non-zero



function createGameBoard(gameBoardSection,size){
  let i =0
  gameBoardSection.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`)
  gameBoardSection.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`)
  while(i<size*size){
    let newCell = createDivCell()
    gameBoardSection.appendChild(newCell)
    i++
  }
  return twoDimensional([...document.querySelectorAll(".cell")],size)
}

function createDivCell(){
  let newDiv = document.createElement("div")
  newDiv.className = "cell"
  return newDiv
}

function twoDimensional(arr, size){
  let result = []; 
  for(var i=0;i < arr.length;i = i+size) result.push(arr.slice(i,i+size));
  return result;
}