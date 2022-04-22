const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // context

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let snakeColor = 'green';
let changingPositionOfSnake = false;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let score = 0;

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 1, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) snakeParts.shift();

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

const changeSnakePosition = function () {
  headX += xVelocity;
  headY += yVelocity;
  changingPositionOfSnake = false;
};

const keyDown = function (event) {
  if (event.keyCode === 32) location.reload(); // if space

  if (changingPositionOfSnake) return;
  if (event.keyCode === 38 || event.keyCode === 87) {
    if (yVelocity == 1) return;
    // up
    yVelocity = -1;
    xVelocity = 0;
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    if (yVelocity == -1) return;
    // down
    yVelocity = 1;
    xVelocity = 0;
  } else if (event.keyCode === 37 || event.keyCode === 65) {
    if (xVelocity == 1) return;
    // left
    yVelocity = 0;
    xVelocity = -1;
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    if (xVelocity == -1) return;
    // right
    yVelocity = 0;
    xVelocity = 1;
  }
  changingPositionOfSnake = true;
};

document.body.addEventListener('keydown', keyDown);

const btn1 = document.querySelector('.btn-1');

btn1.addEventListener('click', function () {
  snakeColor = 'purple';
});

const drawApple = function () {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};

const checkAppleCollision = function () {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
};

const drawScore = function () {
  ctx.fillStyle = 'white';
  ctx.font = '12px Verdana';
  ctx.fillText(`Score ${score}`, canvas.width - 60, 20);
};

const isGameOver = function () {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) return false;

  // walls
  if (headX < 0) gameOver = true;
  else if (headX === tileCount) gameOver = true;
  else if (headY < 0) gameOver = true;
  else if (headY === tileCount) gameOver = true;

  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '50px Verdana';
    ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
};

// game loop
function drawGame() {
  changeSnakePosition();
  if (isGameOver()) return;

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  setTimeout(drawGame, 800 / speed);
}

drawGame();
