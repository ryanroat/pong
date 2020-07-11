window.onload = () => {
    console.log('document loaded');

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

    // updates canvas
    drawField = () => {
        // draw blank black playing field
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // draw left player paddle
        colorRect(0, 210, 10, 100, 'white');
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
};
