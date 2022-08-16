const personFactory = (name) => {

}

const Gameboard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];
    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    function updateBoard(index, player) {

        let clickedPiece = document.querySelector(`.board :nth-child(${index + 1})`)

        if (player == 'player1') {
            board[index] = 'X';
            clickedPiece.innerHTML = 'X'
        } else {
            board[index] = 'O';
            clickedPiece.innerHTML = 'O'
        }

        _checkWinner();

    }

    function _checkWinner() {

        // Keep track of the marked board pieces
        const playerOne = [];
        const playerTwo = [];

        // Differentiate between marks placed by players
        for (let i = 0; i < board.length; i++) {
            if (board[i] == 'X') playerOne.push(i);
            if (board[i] == 'O') playerTwo.push(i);
        }

        let total = playerOne.concat(playerTwo);
        if (total == board.length) console.log('tie!');

        // A function to check whether all items in the second argument are present within the first
        const checker = (arr, target) => target.every(v => arr.includes(v));

        for (let i = 0; i < winningPatterns.length; i++) {
            if (checker(playerOne, winningPatterns[i])) {
                console.log('Player one winner');
            } else if (checker(playerTwo, winningPatterns[i])) {
                console.log('player two wins');
            }
        }
    }

    return { updateBoard }

})();

const displayController = (() => {

    const { updateBoard } = Gameboard;

    const boardSquares = [...document.querySelectorAll('.board-item')];

    boardSquares.forEach(element => {
        element.addEventListener('click', _updateBoard)
    });

    function _updateBoard() {
        let index = boardSquares.indexOf(this);
        let player = 'player1';
        updateBoard(index, player);
    };

})();
