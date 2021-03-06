import Snake from './snake.js';
import Food from './food.js';

/*-------------------------------- Constants / Variables --------------------------------*/
const up = { x: 0, y:-1 },
      down = { x: 0, y: 1 },
      right  = { x: 1, y: 0 },
      left  = { x:-1, y: 0 },
      dir = [up,down,right,left]

const boardSize = 32

let keyPress,
    score,
    scoreFactor =100,
    food,
    randomDirection,
    foodPosition,
    snake,
    gamePlayInterval,
    snakeHead

/*------------------------ Cached Element References ------------------------*/
let gameBoardSection = document.getElementById("game-board")
const board = createGameBoard(gameBoardSection, boardSize),
      scoreEl = document.getElementById("score-board"),
      instructions = document.getElementById("instructions"),
      speedBtn = document.querySelectorAll(".speed-btn"),
      speedEl = document.getElementById("speed"),
      scoreNoise = new Audio("audio/points-added.wav"),
      deathSound = new Audio("audio/video-game-blood-pop.wav")


/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("keydown",getUserInput)
speedBtn.forEach(button=>button.addEventListener("click",(e)=>speedChange(e.target.innerText)))


/*-------------------------------- Functions --------------------------------*/


function init(){
  score = 0
  randomDirection = dir[Math.floor(Math.random()*dir.length)]
  snake = new Snake(getRandomPosition(),randomDirection)
  food = new Food()
  renderNewBoard()
  gamePlay()
}

//Here be game while loop
function gamePlay(){
  gamePlayInterval = setInterval(()=>{
    updateState()
    if(snake.isDead){
      deathSound.play()
      clearInterval(gamePlayInterval)
    }
    render()
  },500/snake.speed)
}

function updateState(){
  !keyPress?snake.move():snake.move(keyPress)
  snakeHead = snake.getHead
  if(checkBounds(snakeHead)&&!snake.isDead){
      if((snakeHead.x == foodPosition.x) && 
        (snakeHead.y == foodPosition.y)){
          snake.eat()
          food.toggleEaten()
          // sound for eating would be here
          speedChange()
        }
    }else{
      if(!snake.isDead) snake.toggleIsDead()
    }
}

/* ------------------------- RENDER FUNCTIONS ------------------------------------- */

function render(){
  if(food.isEaten) renderFood()
  if((score/scoreFactor)!=(snake.getSize()-1)) renderScore()
  if(!snake.isDead){
    renderSnake()
  }else{
    renderEndGame()
  }
}

function renderNewBoard(){
  instructions.innerText = "Press Q to quit"
  scoreEl.innerText=`Score: ${score}`
  speedEl.innerText = snake.speed
  scoreEl.style.display = "block"
  board.forEach(row=>row.forEach(cell=>cell.className="cell"))
  renderFood()
}

function renderFood(){
  if(food.isEaten){
    board[foodPosition.y][foodPosition.x].className = "cell"
    food.toggleEaten()
  }
  placeFood()
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

function renderScore(){
  updateScore()
  scoreNoise.play()
  scoreEl.innerText=`Score: ${score}`
}

function renderEndGame(){
  instructions.innerText="You Died! Press Space Bar to Play Again"
}

/* ------------------ EVENT LISTENER FUNCTIONS ----------------------------------- */

function getUserInput(e){
  switch(e.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "down"
      keyPress = down
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "up"
      keyPress = up;
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      keyPress = left;
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      keyPress = right;
      break;
    case "Space":
      init();
      break;
    case "KeyQ":
      clearInterval(gamePlayInterval)
  }
}

function speedChange(speedIncrease="Faster"){
  if(speedIncrease ==="Faster"){
    ++snake.speed
    speed.innerText = snake.speed
  }else if((speedIncrease ==="Slower")&&(snake.speed>1)){
    --snake.speed
    speed.innerText = snake.speed
  }
  clearInterval(gamePlayInterval)
  gamePlay()
}

/*------------------------- HELPER FUNCTIONS  ------------------------------------------------*/


// Functions to help with gameplay

function getRandomPosition(){
  return {
    x: Math.floor(Math.random()*boardSize),
    y: Math.floor(Math.random()*boardSize)
  }
}

function updateScore(){
  score = ((snake.getSize()-1)*scoreFactor)
}

function checkBounds(position){
  return (position.y>-1 && position.y < boardSize)&&
         (position.x>-1 && position.x < boardSize)
}

function placeFood(){
  do{
    foodPosition=getRandomPosition()
  }while(snake.positions.includes(foodPosition))
}

// Functions that help to create the board

function createGameBoard(gameBoardSection,size){
  let i =0
  gameBoardSection.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`)
  gameBoardSection.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`)
  while(i<size*size){
    let newCell = createDivCell()
    gameBoardSection.appendChild(newCell)
    i++
  }
  return createTwoDimensional([...document.querySelectorAll(".cell")],size)
}

function createDivCell(){
  let newDiv = document.createElement("div")
  newDiv.className = "cell"
  return newDiv
}

function createTwoDimensional(arr, size){
  let result = []; 
  for(var i=0;i < arr.length;i = i+size) result.push(arr.slice(i,i+size));
  return result;
}
