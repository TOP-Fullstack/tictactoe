let origBoard = ['', '', '', '', '', '', '', '', '']
const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
const boardSquares = [...document.querySelectorAll('.board-item')];
boardSquares.forEach(element => {
    element.addEventListener('click', _updateBoard)
});

let AI = 'X'
let HUMAN = 'O'


let scores = {
    'X': 1,
    'O': -1,
    'tie': 0
}

function _updateBoard() {

    let position = boardSquares.indexOf(this);
    if (boardSquares[position].firstChild.innerHTML) return;
    placeMark(position, 'black', HUMAN);
    origBoard[position] = HUMAN;

    bestMove();

    // let winner = checkWinner()
    // if (winner) alert('winner');
}

function placeMark(position, color, mark) {
    let clickedPiece = document.querySelector(`.board :nth-child(${position + 1}) > span`)
    clickedPiece.className = 'fadeIn';
    clickedPiece.style.color = color;
    clickedPiece.innerHTML = mark;
}



// CHECK WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNR

function checkWinner() {

    let winner = null;

    let player1 = [], player2 = [];
    for (let i = 0; i < origBoard.length; i++) {

        if (origBoard[i] == 'X') {
            player1.push(i)
        }
        else if (origBoard[i] == 'O') {
            player2.push(i);
        }
    }

    // A function to check whether all items in the second argument are present within the first
    const checker = (arr, target) => target.every(v => arr.includes(v));

    for (let i = 0; i < winningPatterns.length; i++) {
        if (checker(player1, winningPatterns[i])) {
            winner = AI;
        } else if (checker(player2, winningPatterns[i])) {
            winner = HUMAN;
        }
    }

    let openSpots = 0;
    for (let i = 0; i < 9; i++) {
        if (origBoard[i] == '') openSpots++;
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}


//  MIN MAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function minimax(board, depth, maximizingPlayer) {

    let result = checkWinner();

    if (result !== null) {
        return scores[result];
    }

    if (maximizingPlayer) {

        let bestScore = -Infinity;

        // Find next empty board position
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = AI;
                let newScore = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(bestScore, newScore);
            }
        }
        return bestScore;
    }
    else {

        let bestScore = Infinity;

        // Find next empty board position
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = HUMAN;
                let newScore = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(bestScore, newScore);
            }
        }
        return bestScore;
    }
}

function bestMove() {

    let bestScore = -Infinity;
    let move;

    // let remaining = remainingIndexes(board);
    for (let i = 0; i < 9; i++) {
        if (origBoard[i] == '') {
            origBoard[i] = AI;
            let newScore = minimax(origBoard, 0, false);
            origBoard[i] = '';
            if (newScore > bestScore) {
                bestScore = newScore;
                move = i;
            }
        }
    }
    origBoard[move] = AI;
    placeMark(move, 'white', AI);
}
