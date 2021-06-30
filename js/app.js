import Snake from './snake.js';
import Food from './food.js';

/*-------------------------------- Constants --------------------------------*/
const UP = { x: 0, y:-1 }
const DOWN = { x: 0, y: 1 }
const RIGHT  = { x: 1, y: 0 }
const LEFT  = { x:-1, y: 0 }
const DIR = [UP,DOWN,RIGHT,LEFT]

const boardSize = 32

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
// Should I make an array of objects that maps the keys with directions?

let keyPressed,
    randomPosition,
    randomDirection,
    snake = new Snake({x:10,y:10},2)

/*------------------------ Cached Element References ------------------------*/
let gameBoardSection = document.getElementById("game-board")
const board = createGameBoard(gameBoardSection, boardSize)

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("keydown",userInput)

/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  randomPosition = {
    x: Math.floor(Math.random()*boardSize),
    y: Math.floor(Math.random()*boardSize)
  }
  randomDirection = DIR[Math.floor(Math.random()*DIR.length)]
  snake = new Snake(randomPosition,randomDirection)
  board.forEach(row=>row.forEach(cell=>cell.className="cell"))
}

let interval = setInterval(()=>{
  if(snake.positions[0].y!=0){
    snake.move(UP)
    renderSnakeMove(UP)
  }else{
    alert("You Died!")
    clearInterval(interval)
  }
},1000/snake.speed)

function renderSnakeMove(delta){
  for(let position of snake.positions){
    board[position.y-delta.y][position.x-delta.x].className = "cell"
    board[position.y][position.x].className = "snake"
  }
}


function userInput(e){
  switch(e.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "down"
      snake.turn(DOWN);
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "up"
      snake.turn(UP);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      snake.turn(LEFT);
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      snake.turn(RIGHT);
      break;
  }

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