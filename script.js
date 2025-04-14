let clickCount = 0;
let timer;
let isGameActive = false;

const countdownDisplay = document.getElementById('countdown');
const clickCountDisplay = document.getElementById('click-count');
const gameArea = document.getElementById('game-area');
const endPanel = document.getElementById('end-panel');
const finalClickCount = document.getElementById('final-click-count');
const averageClicks = document.getElementById('average-clicks');
const restartButton = document.getElementById('restart-button');
const durationButtons = document.querySelectorAll('.duration-button');
const resetButton = document.getElementById('reset-button');

let countdown = 10;

durationButtons.forEach(button => {
    button.addEventListener('click', () => {
        durationButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        countdown = parseInt(button.getAttribute('data-duration'));
        countdownDisplay.textContent = `Temps restant : ${countdown}s`;
    });
});

function startGame() {
    if (isGameActive) return;

    isGameActive = true;
    clickCount = 0;
    clickCountDisplay.textContent = `${clickCount}`;
    countdownDisplay.textContent = `Temps restant : ${countdown.toFixed(2)}s`;

    endPanel.style.display = 'none';
    gameArea.classList.remove('disabled');
    resetButton.style.display = 'block';

    const startTime = Date.now();
    const endTime = startTime + countdown * 1000;

    timer = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = (endTime - currentTime) / 1000;

        if (timeLeft <= 0) {
            clearInterval(timer);
            isGameActive = false;
            countdownDisplay.textContent = "Temps écoulé !";

            finalClickCount.textContent = clickCount;
            averageClicks.textContent = (clickCount / countdown).toFixed(2);
            endPanel.style.display = 'block';
            gameArea.classList.add('disabled');
            resetButton.style.display = 'none';
        } else {
            countdownDisplay.textContent = `Temps restant : ${timeLeft.toFixed(2)}s`;
        }
    }, 10);
}

function countClick() {
    if (!isGameActive) return;
    clickCount++;
    clickCountDisplay.textContent = `${clickCount}`;
}

function createClickAnimation(x, y) {
    const animation = document.createElement('div');
    animation.classList.add('container');

    animation.style.left = `${x - 22.5}px`;
    animation.style.top = `${y - 22.5}px`;

    gameArea.appendChild(animation);

    setTimeout(() => {
        gameArea.removeChild(animation);
    }, 1000); 
}

gameArea.addEventListener('click', (event) => {
    if (!isGameActive) {
        startGame();
    }

    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    countClick();
    createClickAnimation(x, y);   
});

restartButton.addEventListener('click', () => {
    endPanel.style.display = 'none';
    gameArea.classList.remove('disabled');
    startGame();
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isGameActive = false;
    clickCount = 0;
    clickCountDisplay.textContent = `${clickCount}`;
    countdownDisplay.textContent = `Temps restant : ${countdown}s`;
    resetButton.style.display = 'none';
});