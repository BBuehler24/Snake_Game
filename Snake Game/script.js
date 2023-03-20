// Be best to use canvas functionality. Learn & use it!
// Function that moves snake & adds length when apples eaten
// Direction selection with keys (event listeners for each key)
// Function that randomized apple spawns
// Wall hit function to detect game overs (as well as hit own snake tail)
// Game over function
// Some sort of gameloop
// Reset Game Function?


const canvas = document.querySelector('#snake-canvas');
const canvas2d = canvas.getContext('2d');
let pName = document.querySelector('#player-name');
let startGame = document.querySelector('#start-game');
let pauseGame = document.querySelector('#pause');

let playerName = '';
let score = 0;
let playerScore = document.getElementById('score');

let getPlayerName = document.querySelector('#submit');
getPlayerName.addEventListener('click', function() {
    playerName = document.querySelector('#nameInput').value;
    pName.innerHTML = `Player Name: ${playerName}`;
})

let hasGameEnded = false;
canvas.width = 600;
canvas.height = 600;

// let pause = false;
let apples = [];
let snakeLengthSegs = [];
let snakeLength = 3;

let snakeX = 0;
let snakeY = 0;

let directionX = 10;
let directionY = 0;
let appleImg = 'Snake Game/Apple.jpg'

function snakeMove() {
    snakeLengthSegs.unshift({ x: snakeX, y: snakeY}); //moves snakeX & snakeY into snakeSegments array
    snakeX += directionX;
    snakeY += directionY;
    while (snakeLengthSegs.length > snakeLength) {
        snakeLengthSegs.pop();
    }
}

function drawSnake() {
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);
    canvas2d.fillStyle = 'black';
    for (let i = 0; i < snakeLengthSegs.length; i++) {
        canvas2d.fillRect(snakeLengthSegs[i].x, snakeLengthSegs[i].y, 10, 10);
    }
}

function gameLoop() {
    snakeMove();
    drawSnake();
    spawnApples();
    checkWallHit();
    if (!hasGameEnded) {
        setTimeout (gameLoop, 100);
    }
}
gameLoop();

document.addEventListener('keydown', (e) => {
    console.log(e);
    switch (e.keyCode) { // if keydown matches any of below keys, updates directionX & directionY accordingly.
        case 37: //37 = Left arrow # on keyboard
            directionX = -10;
            directionY = 0;
            break;
        case 38: //38 = Up arrow # on keyboard
            directionX = 0;
            directionY = -10;
            break;
        case 39: //39 = Right arrow # on keyboard
            directionX = 10;
            directionY = 0;
            break;
        case 40: //40 = Down arrow # on keyboard
            directionX = 0;
            directionY = 10;
            break;    
    }
});

function spawnApples () {
    if (apples.length < 15) {
        let applesX = Math.floor(Math.random() * canvas.width);
        let applesY = Math.floor(Math.random() * canvas.height);
        apples.push({x: applesX, y: applesY});
        }
        for (let i = 0; i < apples.length; i++) {
            canvas2d.fillStyle = 'red';
            canvas2d.fillRect(apples[i].x, apples[i].y, 10, 10);
    }
}

function checkWallHit () {
    for (let i = 0; i < apples.length; i++) {
        if (snakeX < apples[i].x + 10 && snakeX + 10 > apples[i].x && snakeY < apples[i].y + 10 && snakeY + 10 > apples[i].y){
            snakeLength++;
            score++;
            playerScore.innerHTML = `Score: ${score}`;
            console.log(score);
            apples.splice(i, 1);
        }
   }
        if (snakeX < -10 || snakeY < -10 || snakeX > canvas.width + 10 || snakeY > canvas.length + 10) {
            gameOver();
        }
        for (let i = 1; i < snakeLengthSegs.length; i++) {
            if (snakeX === snakeLengthSegs[i].x && snakeY === snakeLengthSegs[i].y) {
                gameOver();
            }
        }
}

function gameOver() {
    setTimeout(function () {
        alert(`Game Over. Your score was ${score}`);
    }, 500);
    hasGameEnded = true;
    snakeLength = 3;
}

// interval = setInterval (function () {
//     requestAnimationFrame (gameLoop)
// }, INTERVAL);

// pauseGame.addEventListener('click', pauseGame);

// function pauseGame () {
//     clearInterval(interval);
// }

startGame.addEventListener('click', resetGame)

function resetGame() {
    window.location.reload();
}