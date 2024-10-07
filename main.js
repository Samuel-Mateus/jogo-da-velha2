document.addEventListener('DOMContentLoaded', () =>{
    const cells = document.querySelectorAll('.cell');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');  
    const gameOverText = document.getElementById('game-over-text');
    const resertButton = document.getElementById('resert-button');
    const newGameButton = document.getElementById('new-game-button');

    let currentPlayer = 'x';
    let player1Points = 0;
    let player2Points = 0;
    let gameOver = false;

    const checkwinner = () => {
        const winnigCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]       
        ];
    for (let combination of winnigCombinations) {
        const [a, b, c,] = combination;
        if(
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer 
        ) {
            return true;
        }
    }
    return false;
    };
    const switchplayer = () => {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    };
    const updateScoreboard = () => {
        player1Score.textContent = `jogador 1 = ${player1Points}`
        player2Score.textContent = `jogador 2 = ${player2Points}`
    };
    const resetGame = () => {
        for (let cell of cells) {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        }
        currentPlayer = 'x';
        gameOver = false;
        gameOverText.textContent = '';
        resertButton.style.display = 'none';
        newGameButton.style.display = 'none';
    };
    const endGame = (result) => {
        gameOver = true;
        gameOverText.textContent = result;

        if (result !== 'velha') {
            if (currentPlayer === 'x') {
                player1Points++;
            } else {
                player2Points++;
            }
        }
        updateScoreboard();
        resertButton.style.display = 'inline-block';
        newGameButton.style.display = 'inline-block';
    };
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
if (!cells[i].textContent && !gameOver) {
    cells[i].textContent = currentPlayer;
    cells[i].classList.add(currentPlayer.toLowerCase());
    
    if (checkwinner()) {
        endGame(`jogador ${currentPlayer} venceu!`);
    } else if ([...cells].every(cell => cell.textContent !== '')) {
        endGame('velha!');
    } else {
        switchplayer();
    }
}
        });
    }
    resertButton.addEventListener('click', resetGame);

    newGameButton.addEventListener('click', () => {
        resetGame();
        player1Points = 0;
        player2Points = 0;
        updateScoreboard();
    });
    });