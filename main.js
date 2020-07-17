const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// target frames per second rate
const FPS = 60;
// initialize ball control variables
let ballX;
let ballY;
const ballRadius = 10;
// horizontal ball speed
let ballSpeedX;
// vertical ball speed
let ballSpeedY;
// let serve;

// paddle details
const paddleWidth = 10;
const paddle1Height = 100;
let paddle1Y = canvas.height / 2 - paddle1Height / 2;
const paddle2Height = 100;
let paddle2Y = canvas.height / 2 - paddle1Height / 2;

// score vars
const winningScore = 7;
let player1Score = 0;
let player2Score = 0;
let showStartScreen = true;
let showingWinScreen = false;

// returns a 'random' number btwn 1 and max inclusive
function rando(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

// start screen
function startScreen() {
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(
        `Get ${winningScore} or more points to win; must win by two.`,
        canvas.width / 2 - 100,
        100
    );
    canvasContext.fillText('click to continue', canvas.width / 2 - 37, 125);
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
    // randomize ballSpeedY between -5 & 5
    ballSpeedY = rando(11) - 6;
    // ballSpeedX inversely proportional to ballSpeedY with random horizontal direction
    ballSpeedX = (12 - Math.abs(ballSpeedY)) * (Math.random() < 0.5 ? -1 : 1);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

// reset ball location to center of canvas
function ballReset() {
    // check for winning score
    if (
        (player1Score >= winningScore && player1Score >= player2Score + 2) ||
        (player2Score >= winningScore && player2Score >= player1Score + 2)
    ) {
        showingWinScreen = true;
    }
    // randomize ballSpeedY between -5 & 5
    ballSpeedY = rando(11) - 6;
    // reverse ballSpeedX and make proportion to ballSpeedY
    ballSpeedX =
        -(ballSpeedX / Math.abs(ballSpeedX)) * (12 - Math.abs(ballSpeedY));
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function drawNet() {
    for (let i = 10; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function drawField() {
    // draw blank black playing field
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // check for new game situation
    if (showStartScreen) {
        startScreen();
        return;
    }
    // check for game over situation
    if (showingWinScreen) {
        const winner =
            player1Score > player2Score ? 'Left Player' : 'Right Player';

        canvasContext.fillStyle = 'white';
        canvasContext.fillText(
            `GAME OVER - ${winner} wins! - click to continue`,
            canvas.width / 2 - 100,
            100
        );

        return;
    }
    // display net
    drawNet();
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
    // display scores
    if (player2Score >= winningScore - 2) {
        canvasContext.fillStyle = 'yellow';
    }
    if (player2Score >= winningScore - 1 && player2Score > player1Score) {
        canvasContext.fillStyle = 'red';
    }
    canvasContext.fillText(player1Score, 100, 100);

    canvasContext.fillStyle = 'white';
    if (player1Score >= winningScore - 2) {
        canvasContext.fillStyle = 'yellow';
    }
    if (player1Score >= winningScore - 1 && player1Score > player2Score) {
        canvasContext.fillStyle = 'red';
    }

    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function computerMove() {
    const paddle2YCenter = paddle2Y + paddle2Height / 2;

    if (paddle2YCenter < ballY - 105) {
        paddle2Y += 15;
    } else if (paddle2YCenter < ballY - 45) {
        paddle2Y += 5;
    } else if (paddle2YCenter > ballY + 105) {
        paddle2Y -= 15;
    } else if (paddle2YCenter > ballY + 45) {
        paddle2Y -= 5;
    }
}

function movement() {
    if (showStartScreen || showingWinScreen) {
        return;
    }
    computerMove();

    // move ball by x vector
    ballX += ballSpeedX;
    // reset ball location if it reaches left edge
    if (ballX < 0) {
        if (
            ballY > paddle1Y - ballRadius &&
            ballY < paddle1Y + ballRadius + paddle1Height
        ) {
            ballSpeedX *= -1;
            const deltaY = ballY - (paddle1Y + paddle1Height / 2);
            ballSpeedY = deltaY * 0.2;
            // ballSpeedX = 10 - Math.abs(ballSpeedY);
        } else {
            // point to player 2
            player2Score++;
            ballReset();
        }
    }
    // reset ball location if it reaches right edge
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddle2Height) {
            ballSpeedX *= -1;
            const deltaY = ballY - (paddle2Y + paddle2Height / 2);
            ballSpeedY = deltaY * 0.2;
            // ballSpeedX = 10 - Math.abs(ballSpeedY);
        } else {
            // point to player 1
            player1Score++;
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
    ballInit();
    const updateField = () => {
        // updates canvas
        drawField();
        movement();
    };

    // draw field at FPS rate
    setInterval(updateField, 1000 / FPS);

    // check for mouse click for game over screen
    canvas.addEventListener('click', evt => {
        console.log('click');
        if (showStartScreen) {
            showStartScreen = false;
        }
        if (showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
            showStartScreen = true;
        }
    });

    // move paddle1 to track mouse
    canvas.addEventListener('mousemove', function(evt) {
        const mousePos = calcMousePos(evt);
        paddle1Y = mousePos.y - paddle1Height / 2;
    });
};
