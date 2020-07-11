window.onload = () => {
    console.log('document loaded');

    const canvas = document.getElementById('gameCanvas');
    const canvasContext = canvas.getContext('2d');

    // target frames per second rate
    const FPS = 30;
    // initial location and size of ball
    let ballX = 50;
    let ballY = 50;
    const ballSize = 16;
    // initial ball vectors
    let ballSpeedX = 8;
    let ballSpeedY = 4;

    // draw canvas rectangle of given size and color
    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }

    // updates canvas
    drawField = () => {
        // draw blank black playing field
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // draw left player paddle
        colorRect(0, 210, 10, 100, 'white');
        // draw red 'ball'
        colorRect(ballX, ballY, ballSize, ballSize, 'red');
        // move ball by x vector
        ballX += ballSpeedX;
        // if ball hits edge of field, reverse x vector
        if (ballX < 1 || ballX > canvas.width - ballSize) {
            ballSpeedX *= -1;
        }
        // move ball by y vector
        ballY += ballSpeedY;
        // if ball hits edge of field, reverse y vector
        if (ballY < 1 || ballY > canvas.height - ballSize) {
            ballSpeedY *= -1;
        }
        // console.log(ballX, ballSpeedX, ballY, ballSpeedY);
    };
    // draw field at FPS rate
    setInterval(drawField, 1000 / FPS);
};
