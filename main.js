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

    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }

    drawField = () => {
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        colorRect(0, 210, 10, 100, 'white');
        colorRect(ballX, ballY, ballSize, ballSize, 'red');
        ballX += ballSpeedX;
        if (ballX < 1 || ballX > canvas.width - ballSize) {
            ballSpeedX *= -1;
        }
        ballY += ballSpeedY;
        if (ballY < 1 || ballY > canvas.height - ballSize) {
            ballSpeedY *= -1;
        }
        console.log(ballX, ballSpeedX, ballY, ballSpeedY);
    };

    setInterval(drawField, 1000 / FPS);
};
