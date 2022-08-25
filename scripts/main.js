// Initialize player factory 
const Player = (name, mark, color) => {

    function placeMark(position, color, mark) {
        let clickedPiece = document.querySelector(`.board-item:nth-child(${position + 1}) > span`)
        clickedPiece.className = 'fadeIn';
        clickedPiece.style.color = color;
        clickedPiece.innerHTML = mark;
    }

    return { name, mark, color, placeMark };
}

// Set two initial players to users with default X + O markers and colors
let playerOne = Player('Player One', 'X', '#4a4a4a');
let playerTwo = Player('Player Two', 'O', '#3ca9ab');

const displayController = (() => {

    // Connect to DOM elements and set initial variables
    const boardSquares = [...document.querySelectorAll('.board-item')];
    const boardMarks = document.querySelectorAll('.board-item > span');
    const aiToggleButton = document.querySelector('.player-toggle');
    const resetButton = document.querySelector('.reset');
    let aiToggleIcon = document.querySelector('.player-toggle span:nth-child(2)');
    let aiToggleText = document.querySelector('.player-toggle span:nth-child(1)');
    let aiToggled = false;
    let winner;
    let player = playerOne;

    // Set bindings
    boardSquares.forEach(element => {
        element.addEventListener('click', _updateBoard)
    });
    aiToggleButton.addEventListener('click', _toggleType);
    resetButton.addEventListener('click', _resetGame);

    // Main game logic
    function _updateBoard() {

        let position = boardSquares.indexOf(this);
        if (boardSquares[position].firstChild.innerHTML) return;
        player.placeMark(position, player.color, player.mark);
        Gameboard.board[position] = player.mark;

        if (!aiToggled) {
            _changeTurns();
            let winner = Gameboard.checkWinner();
            // Declare winner, create winner function
            if (winner) {
                if (winner.mark == 'tie') console.log('tie')
                else displayLine(winner, Gameboard.board)
            }
        }
        else {
            let winner = Gameboard.checkWinner()
            if (winner) {
                console.log('tie')
            } else {
                bestMove();
                winner = Gameboard.checkWinner()
                if (winner) displayLine(winner, Gameboard.board);
            }
            // Declare winner, create winner function
        }
    }

    function _changeTurns() {
        if (player == playerOne) player = playerTwo;
        else { player = playerOne }
    }

    function _toggleType() {

        _resetGame();

        // Turn on AI
        if (!aiToggled) {
            aiToggleIcon.innerHTML = "🤖"
            aiToggleText.innerHTML = "Computer"
            aiToggled = true;
        }
        // Turn off AI
        else {
            aiToggleIcon.innerHTML = "🧍🧍"
            aiToggleText.innerHTML = "Two Player"
            aiToggled = false;
        }
    }

    function _resetGame() {

        player = playerOne;
        for (let i = 0; i < Gameboard.board.length; i++) {
            Gameboard.board[i] = '';
        }
        boardMarks.forEach((e) => {
            e.classList.remove('fadeIn');
            e.classList.add('fadeOut');
            e.style.fontSize = '4rem';
            e.style.opacity = '1';
            e.innerHTML = '';
        });

        // Reset lines
        path.classList.add('hidden');
        path.classList.remove('key-anim1');
        container.style.zIndex = '-1';
    }

    return { winner }

})();

const Gameboard = (() => {

    let board = ['', '', '', '', '', '', '', '', '']

    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    function checkWinner() {

        let winner = null;
        let total = 0;

        // Split up the board into two smaller temporary arrays 
        let player1 = [], player2 = [];
        for (let i = 0; i < Gameboard.board.length; i++) {

            if (Gameboard.board[i] == 'X') {
                player1.push(i)
                total++;
            }
            else if (Gameboard.board[i] == 'O') {
                player2.push(i);
                total++
            }
        }

        // Check whether all items in the second argument are present within the first
        const checker = (arr, target) => target.every(v => arr.includes(v));

        for (let i = 0; i < winningPatterns.length; i++) {
            if (checker(player1, winningPatterns[i])) {
                winner = playerOne;
            } else if (checker(player2, winningPatterns[i])) {
                winner = playerTwo;
            }
        }

        // Returned an object with a key of mark here so the minimax algo will still work properly
        if (winner == null && total == 9) {
            return { mark: 'tie' };
        } else {
            return winner;
        }
    }

    return { checkWinner, board }

})();