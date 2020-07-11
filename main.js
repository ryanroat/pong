window.onload = () => {
    console.log('document loaded');

    const canvas = document.getElementById('gameCanvas');
    const canvasContext = canvas.getContext('2d');

    const FPS = 30;
    let ballX = 50;
    let ballY = 50;
    const ballSize = 16;
    let ballSpeedX = 8;
    let ballSpeedY = 4;

    drawField = () => {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(ballX, ballY, ballSize, ballSize);
        ballX += ballSpeedX;
        if (ballX < 1 || ballX > 800 - ballSize) {
            ballSpeedX *= -1;
        }
        ballY += ballSpeedY;
        if (ballY < 1 || ballY > 600 - ballSize) {
            ballSpeedY *= -1;
        }
        console.log(ballX, ballSpeedX, ballY, ballSpeedY);
    };

    setInterval(drawField, 1000 / FPS);
};
