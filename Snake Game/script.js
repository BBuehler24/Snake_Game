const canvas = document.querySelector('#snake-canvas');
const canvas2d = canvas.getContext('2d');

let hasGameEnded = false;
canvas.width = 400;
canvas.height = 400;

let snakeSegments = [];
let snakeLength = 1;

let snakeX = 0;
let snakeY = 0;

let directionX = 10;
let directionY = 0;

function moveSnake() {
    snakeSegments.unshift({ x: snakeX, y: snakeY}); //moves snakeX & snakeY into snakeSegments array
}

function drawSnake() {
    canvas2d.fillStyle = 'black';
    for (let i = 0; i < snakeSegments.length; i++) {
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'arrowLeft':
            directionX = -10;
            directionY = 0;
            break;
        case 'arrowUp':
            directionX = 0;
            directionY = -10;
            break;
        case 'arrowRight':
            directionX = 10;
            directionY = 0;
            break;
        case 'arrowDown':
            directionX = 0;
            directionY = 10;
            break;    
    }
});

setInterval(function gameLoop() {
    moveSnake();
    drawSnake();
}, 100);