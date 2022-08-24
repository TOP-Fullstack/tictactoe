let scores = {
    'X': -1,
    'O': 1,
    'tie': 0
}

function minimax(board, depth, maximizingPlayer) {

    let result = Gameboard.checkWinner();

    if (result !== null) {
        return scores[result.mark];
    }

    if (maximizingPlayer) {

        let bestScore = -Infinity;

        // Find next empty board position
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = playerTwo.mark;
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
                board[i] = playerOne.mark;
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
    player = playerTwo;
    player.name = 'Computer';

    // let remaining = remainingIndexes(board);
    for (let i = 0; i < 9; i++) {
        if (Gameboard.board[i] == '') {
            Gameboard.board[i] = player.mark;
            let newScore = minimax(Gameboard.board, 0, false);
            Gameboard.board[i] = '';
            if (newScore > bestScore) {
                bestScore = newScore;
                move = i;
            }
        }
    }
    Gameboard.board[move] = player.mark;
    player.placeMark(move, player.color, player.mark);
}
