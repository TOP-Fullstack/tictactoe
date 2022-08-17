const Player = (name, mark) => {
    const markers = [];
    return { name, markers, mark };
}

const playerOne = Player('player1', 'X');
const playerTwo = Player('player2', 'O');

const Gameboard = (() => {

    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    function updateBoard(index, player) {

        // Update DOM
        let clickedPiece = document.querySelector(`.board :nth-child(${index + 1}) > span`)
        clickedPiece.className = 'fadeIn';
        clickedPiece.innerHTML = player.mark;


        // Update internal gameboard + the player's array of played pieces
        player.markers.push(index);

        _checkWinner();

    }

    function _checkWinner() {

        let winner;
        let total = playerOne.markers.concat(playerTwo.markers);

        // A function to check whether all items in the second argument are present within the first
        const checker = (arr, target) => target.every(v => arr.includes(v));

        for (let i = 0; i < winningPatterns.length; i++) {
            if (checker(playerOne.markers, winningPatterns[i])) {
                console.log('Player one winner');
                winner = playerOne;
            } else if (checker(playerTwo.markers, winningPatterns[i])) {
                console.log('player two wins');
                winner = playerTwo;
            }
        }

        if (total.length == 9 && !winner) console.log('tie!');
    }

    return { updateBoard }

})();

const displayController = (() => {

    const { updateBoard } = Gameboard;

    const boardSquares = [...document.querySelectorAll('.board-item')];

    boardSquares.forEach(element => {
        element.addEventListener('click', _updateBoard)
    });

    let player;
    function _changeTurns() {
        if (player == playerOne) player = playerTwo;
        else { player = playerOne }
    }

    function _updateBoard() {
        let index = boardSquares.indexOf(this);
        _changeTurns();
        updateBoard(index, player);
    };

})();
