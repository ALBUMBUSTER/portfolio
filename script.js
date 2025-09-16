const player = document.getElementById('player');
const maze = document.getElementById('maze');
const goal = document.getElementById('goal');
const gameOver = document.getElementById('game-over');
const tryAgainButton = document.getElementById('try-again');
const winScreen = document.getElementById('win-screen');
const winOkButton = document.getElementById('win-ok');
const nextLevelButton = document.getElementById('next-level');

let playerX = 10;
let playerY = 10;
const playerSize = 20;
let currentLevel = 0;

const levels = [
    {
        walls: [
            { x: 100, y: 0, w: 10, h: 150 },
            { x: 200, y: 150, w: 10, h: 250 },
            { x: 0, y: 150, w: 75, h: 10 },
            { x: 250, y: 50, w: 150, h: 10 },
            { x: 150, y: 300, w: 10, h: 100 },
            { x: 50, y: 200, w: 100, h: 10 },
            { x: 250, y: 100, w: 10, h: 150 },
            { x: 300, y: 250, w: 75, h: 10},
        ],
        goalX: 360,
        goalY: 360
    },
    {
        walls: [
            { x: 50, y: 50, w: 10, h: 250 },
            { x: 150, y: 100, w: 200, h: 10 },
            { x: 100, y: 300, w: 200, h: 10 },
            { x: 150, y: 0, w: 10, h: 150},
            { x: 300, y: 200, w: 10, h: 150},
            { x: 0, y: 50, w: 100, h: 10},
            { x: 250, y: 200, w: 150, h: 10},
            { x: 75, y: 150, w: 50, h: 10},
            { x: 225, y: 250, w: 50, h: 10},
        ],
        goalX: 10,
        goalY: 360
    },
    {
        walls: [
            { x: 100, y: 0, w: 10, h: 150 },
            { x: 200, y: 150, w: 10, h: 250 },
            { x: 0, y: 150, w: 75, h: 10 },
            { x: 250, y: 50, w: 150, h: 10 },
            { x: 150, y: 300, w: 10, h: 100 },
            { x: 50, y: 200, w: 100, h: 10 },
            { x: 250, y: 100, w: 10, h: 150 },
            { x: 300, y: 250, w: 75, h: 10},
        ],
        goalX: 360,
        goalY: 10
    }
];

function createWalls() {
    maze.innerHTML = '';
    levels[currentLevel].walls.forEach(wall => {
        const wallDiv = document.createElement('div');
        wallDiv.className = 'wall';
        wallDiv.style.left = wall.x + 'px';
        wallDiv.style.top = wall.y + 'px';
        wallDiv.style.width = wall.w + 'px';
        wallDiv.style.height = wall.h + 'px';
        maze.appendChild(wallDiv);
    });
}

function updatePlayerPosition() {
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}

function checkCollision(x, y) {
    const mazeRect = maze.getBoundingClientRect();

    if (x < 0 || y < 0 || x + playerSize > mazeRect.width || y + playerSize > mazeRect.height) {
        return true;
    }

    const playerRect = { x: x, y: y, w: playerSize, h: playerSize };

    for (const wall of levels[currentLevel].walls) {
        if (
            playerRect.x < wall.x + wall.w &&
            playerRect.x + playerRect.w > wall.x &&
            playerRect.y < wall.y + wall.h &&
            playerRect.y + playerRect.h > wall.y
        ) {
            return true;
        }
    }

    return false;
}

function checkWin() {
    const playerRect = player.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

    if (playerRect.left < goalRect.left + goalRect.width &&
        playerRect.left + playerRect.width > goalRect.left &&
        playerRect.top < goalRect.top + goalRect.height &&
        playerRect.top + playerRect.height > goalRect.top) {
        winScreen.style.display = 'block';
    }
}

function resetGame() {
    playerX = 10;
    playerY = 10;
    updatePlayerPosition();
    gameOver.style.display = 'none';
    winScreen.style.display = 'none';
}

function loadLevel() {
    if (currentLevel < levels.length) {
        createWalls();
        goal.style.left = levels[currentLevel].goalX + 'px';
        goal.style.top = levels[currentLevel].goalY + 'px';
        resetGame();
    } else {
        alert('You beat all the levels!');
        currentLevel = 0;
        loadLevel();
    }
}

document.addEventListener('keydown', (event) => {
    let moveX = 0;
    let moveY = 0;

    switch (event.key) {
        case 'ArrowUp':
            moveY = -5;
            break;
        case 'ArrowDown':
            moveY = 5;
            break;
        case 'ArrowLeft':
            moveX = -5;
            break;
        case 'ArrowRight':
            moveX = 5;
            break;
    }

    const tempX = playerX + moveX;
    const tempY = playerY + moveY;

    if (!checkCollision(tempX, tempY)) {
        playerX = tempX;
        playerY = tempY;
        updatePlayerPosition();
        checkWin();
    } else {
        gameOver.style.display = 'block';
    }
});

createWalls();
updatePlayerPosition();
tryAgainButton.addEventListener('click', resetGame);
winOkButton.addEventListener('click', resetGame);
nextLevelButton.addEventListener('click', () => {
    currentLevel++;
    loadLevel();
});
loadLevel();