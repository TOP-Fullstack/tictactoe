const Player = (name, mark) => {
    const markers = [];
    return { name, markers, mark };
}

const playerOne = Player('player1', 'X');
const playerTwo = Player('player2', 'O');

const Gameboard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];
    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    function updateBoard(index, player) {

        // Update DOM
        let clickedPiece = document.querySelector(`.board :nth-child(${index + 1})`)
        clickedPiece.innerHTML = player.mark;

        // Update internal gameboard + the player's array of played pieces
        board[index] = player.mark;
        player.markers.push(index);

        _checkWinner();

    }

    function _checkWinner() {

        let total = playerOne.markers.concat(playerTwo.markers);
        if (total == board.length) console.log('tie!');

        // A function to check whether all items in the second argument are present within the first
        const checker = (arr, target) => target.every(v => arr.includes(v));

        for (let i = 0; i < winningPatterns.length; i++) {
            if (checker(playerOne.markers, winningPatterns[i])) {
                console.log('Player one winner');
            } else if (checker(playerTwo.markers, winningPatterns[i])) {
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

    let player = playerTwo;

    function _updateBoard() {
        let index = boardSquares.indexOf(this);
        updateBoard(index, player);
    };

})();
