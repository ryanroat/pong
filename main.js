const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// target frames per second rate
const FPS = 30;
// initialize ball control variables
let ballX;
let ballY;
const ballRadius = 10;
let ballSpeedX;
let ballSpeedY;
// let serve;

// paddle details
const paddleWidth = 10;
const paddle1Height = 100;
let paddle1Y = canvas.height / 2 - paddle1Height / 2;
const paddle2Height = 100;
let paddle2Y = canvas.height / 2 - paddle1Height / 2;

// returns a 'random' number btwn 1 and max inclusive
function rando(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

// mouse position

function calcMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

// draw canvas rectangle of given location, size and color
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

// draw canvas circle of given location, radius and color
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

// initialize ball speed and direction
function ballInit() {
    // serve indicates ball X direction as -1 or 1
    // serve =
    // radomize ballSpeed X between 10 & 15
    ballSpeedX = rando(6) + 9 * (Math.random() < 0.5 ? -1 : 1);
    // randomize ballSpeedY between -10 & 10
    ballSpeedY = rando(21) - 11;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

// reset ball location to center of canvas
function ballReset() {
    // reverse ballSpeedX
    ballSpeedX = -(ballSpeedX / Math.abs(ballSpeedX)) * (rando(6) + 9);
    // randomize ballSpeedY between -10 & 10
    ballSpeedY = rando(21) - 11;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function drawField() {
    // draw blank black playing field
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // draw left player paddle
    colorRect(0, paddle1Y, paddleWidth, paddle1Height, 'white');
    // draw right player paddle
    colorRect(
        canvas.width - paddleWidth,
        paddle2Y,
        paddleWidth,
        paddle2Height,
        'white'
    );
    // draw white ball
    colorCircle(ballX, ballY, ballRadius, 'white');
}

function computerMove() {
    const paddle2YCenter = paddle2Y + paddle2Height / 2;

    if (paddle2YCenter < ballY - 100) {
        paddle2Y += 25;
    } else if (paddle2YCenter < ballY - 35) {
        paddle2Y += 10;
    } else if (paddle2YCenter > ballY + 100) {
        paddle2Y -= 25;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 10;
    }
}

function movement() {
    computerMove();

    // move ball by x vector
    ballX += ballSpeedX;
    // reset ball location if it reaches left edge
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddle1Height) {
            ballSpeedX *= -1;
        } else {
            ballReset();
        }
    }
    // reset ball location if it reaches right edge
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddle2Height) {
            ballSpeedX *= -1;
        } else {
            ballReset();
        }
    }

    // move ball by y vector
    ballY += ballSpeedY;
    // if ball hits edge of field, reverse y vector
    if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
        ballSpeedY *= -1;
    }
}

window.onload = () => {
    console.log('document loaded');
    //
    ballInit();
    const updateField = () => {
        // updates canvas
        drawField();
        movement();
    };

    // draw field at FPS rate
    setInterval(updateField, 1000 / FPS);

    // move paddle1 to track mouse
    canvas.addEventListener('mousemove', function(evt) {
        const mousePos = calcMousePos(evt);
        paddle1Y = mousePos.y - paddle1Height / 2;
    });
};
