window.onload = () => {
    console.log('document loaded');

    const canvas = document.getElementById('gameCanvas');
    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.clientWidth, canvas.height);
};
