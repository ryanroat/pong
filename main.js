const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// target frames per second rate
const FPS = 30;
// initial location and size of ball
let ballX = 50;
let ballY = 50;
const ballRadius = 10;
// initial ball vectors
let ballSpeedX = 8;
let ballSpeedY = 4;

// paddle details
let paddle1Y = 250;
const paddle1Height = 100;

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

window.onload = () => {
    console.log('document loaded');
    // updates canvas
    drawField = () => {
        // draw blank black playing field
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // draw left player paddle
        colorRect(0, paddle1Y, 10, paddle1Height, 'white');
        // draw white ball
        colorCircle(ballX, ballY, ballRadius, 'white');
        // move ball by x vector
        ballX += ballSpeedX;
        // if ball hits edge of field, reverse x vector
        if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
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
