const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// target frames per second rate
const FPS = 30;
// initial location and size of ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
// initial ball vectors
let ballSpeedX = 8;
let ballSpeedY = 4;

// paddle details
const paddle1Height = 100;
let paddle1Y = canvas.height / 2 - paddle1Height / 2;
const paddle2Height = 100;
const paddle2Y = canvas.height / 2 - paddle1Height / 2;

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
// reset ball location to center of canvas
function ballReset() {
    ballSpeedX *= -1;
    // TODO: need random ballSpeedY here
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

window.onload = () => {
    console.log('document loaded');
    // updates canvas
    drawField = () => {
        // draw blank black playing field
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // draw left player paddle
        colorRect(0, paddle1Y, 10, paddle1Height, 'white');
        // draw right player paddle
        colorRect(canvas.width - 10, paddle2Y, 10, paddle2Height, 'white');
        // draw white ball
        colorCircle(ballX, ballY, ballRadius, 'white');
        // move ball by x vector
        ballX += ballSpeedX;
        // rest ball location if it reaches left edge
        if (ballX < 0) {
            if (ballY > paddle1Y && ballY < paddle1Y + paddle1Height) {
                ballSpeedX *= -1;
            } else {
                ballReset();
            }
        }
        // if ball hits edge of field, reverse x vector
        if (/* ballX < ballRadius || */ ballX > canvas.width - ballRadius) {
            ballSpeedX *= -1;
        }
        // move ball by y vector
        ballY += ballSpeedY;
        // if ball hits edge of field, reverse y vector
        if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
            ballSpeedY *= -1;
        }
        // console.log(ballX, ballSpeedX, ballY, ballSpeedY);
    };
    // draw field at FPS rate
    setInterval(drawField, 1000 / FPS);

    canvas.addEventListener('mousemove', function(evt) {
        const mousePos = calcMousePos(evt);
        paddle1Y = mousePos.y - paddle1Height / 2;
    });
};
