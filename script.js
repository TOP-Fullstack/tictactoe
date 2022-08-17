const Player = (name, mark, color) => {
    const markers = [];
    return { name, markers, mark, color };
}

const Gameboard = (() => {

    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    function checkWinner() {

        let winner;
        let total = playerOne.markers.concat(playerTwo.markers);

        // A function to check whether all items in the second argument are present within the first
        const checker = (arr, target) => target.every(v => arr.includes(v));

        for (let i = 0; i < winningPatterns.length; i++) {
            if (checker(playerOne.markers, winningPatterns[i])) {
                winner = playerOne;
            } else if (checker(playerTwo.markers, winningPatterns[i])) {
                winner = playerTwo;
            }
        }

        if (total.length == 9 && !winner) return { name: 'It\'s a tie!' };

        return winner;
    }

    return { checkWinner }

})();

const displayController = (() => {

    const { checkWinner } = Gameboard;
    const boardSquares = [...document.querySelectorAll('.board-item')];
    const boardMarks = document.querySelectorAll('.board-item > span');
    const board = document.querySelector('.board-bg');
    const endDisplay = document.querySelector('.end-display');
    const reset = document.querySelector('.reset');
    let winner;
    const winnerName = document.querySelector('.winner-name');
    const robot = document.querySelector('.toggle-computer');

    boardSquares.forEach(element => {
        element.addEventListener('click', _updateBoard)
    });

    reset.addEventListener('click', _resetGame);

    let player;
    function _changeTurns() {
        if (player == playerOne) player = playerTwo;
        else { player = playerOne }
    }

    function _placeMark(index) {

        let clickedPiece = document.querySelector(`.board :nth-child(${index + 1}) > span`)
        clickedPiece.className = 'fadeIn';
        clickedPiece.style.color = player.color;
        clickedPiece.innerHTML = player.mark;
    }

    function _updateBoard() {

        // Update DOM
        let index = boardSquares.indexOf(this);
        if (boardSquares[index].firstChild.innerHTML) return;
        _changeTurns();
        _placeMark(index);

        player.markers.push(index);

        winner = checkWinner();
        if (winner) {
            setTimeout(_endGame, 1000)
        }
    }

    function _endGame() {
        boardMarks.forEach((e) => {
            e.classList.remove('fadeIn');
            e.classList.add('fadeOut');
            e.innerHTML = '';
        });
        playerOne.markers = [];
        playerTwo.markers = [];
        board.classList.remove('fadeIn');
        board.classList.add('fadeOut');
        endDisplay.classList.remove('fadeOut');
        endDisplay.classList.add('fadeIn');
        winnerName.innerHTML = winner.name;
    }

    function _resetGame() {
        board.classList.remove('fadeOut');
        board.classList.add('fadeIn');
        endDisplay.classList.remove('fadeIn');
        endDisplay.classList.add('fadeOut');
    }

})();

const playerOne = Player('Player one', 'X', '#000f00');
const playerTwo = Player('Player two', 'O', 'white');
