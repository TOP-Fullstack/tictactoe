// Initialize factories 
const Player = (name, mark, color) => {
    const markers = [];
    return { name, markers, mark, color };
}

const Computer = ((name, mark, color) => {

    const { markers } = Player(name, mark, color);

    let winner;
    let total = playerOne.markers.concat(playerTwo.markers);

    const selectRandom = () => {

        // Stop running if both the markers placed add up to 9
        if (total.length != 9) {

            let position = Math.floor(Math.random() * 9);
            while (markers.includes(position) || playerOne.markers.includes(position)) {
                position = Math.floor(Math.random() * 9);
            };

            markers.push(position);
            displayController.placeMark(position, color, mark);

            winner = Gameboard.checkWinner();
            if (winner) console.log('wins');
        }
    }

    return { name, markers, mark, color, selectRandom };

})

// Set two initial players to users with default X + O markers and colors
let playerOne = Player('Player One', 'X', '#000f00');
let playerTwo = Player('Player Two', 'O', 'white');

const displayController = (() => {

    // Initialize variables
    const boardSquares = [...document.querySelectorAll('.board-item')];
    const boardMarks = document.querySelectorAll('.board-item > span');
    const board = document.querySelector('.board-bg');
    const endDisplay = document.querySelector('.end-display');
    const reset = document.querySelector('.reset');
    const winnerName = document.querySelector('.winner-name');
    const robot = document.querySelector('.toggle-computer');
    let robotToggled = false;
    let winner, player;

    // Set initial players to two users, and make playerOne the first player
    player = playerOne;

    // Set bindings
    boardSquares.forEach(element => {
        element.addEventListener('click', _updateBoard)
    });
    reset.addEventListener('click', _endGame);
    robot.addEventListener('click', _setRobot);

    function placeMark(position, color, mark) {
        let clickedPiece = document.querySelector(`.board :nth-child(${position + 1}) > span`)
        clickedPiece.className = 'fadeIn';
        clickedPiece.style.color = color;
        clickedPiece.innerHTML = mark;
    }

    function _updateBoard() {

        // Everytime the board is clicked by user, have the playerTwo.selectRandom(); function run
        let position = boardSquares.indexOf(this);
        if (boardSquares[position].firstChild.innerHTML) return;
        placeMark(position, player.color, player.mark);
        player.markers.push(position);
        if (!robotToggled) _changeTurns();

        if (robotToggled) {
            playerTwo.selectRandom();
        }

        winner = Gameboard.checkWinner();
        if (winner) {
            setTimeout(_endGame, 500)
        }

        console.log(playerTwo);
    }

    // Create helper functions
    function _toggleFade(element) {
        element.classList.toggle('fadeIn');
        element.classList.toggle('fadeOut');
    }

    function _changeTurns() {
        if (player == playerOne) player = playerTwo;
        else { player = playerOne }
    }

    function _setRobot() {
        _resetGame();
        playerTwo = Computer('Computer', '🤖', 'white');
        robotToggled = true;
    }

    function _resetGame() {
        boardMarks.forEach((e) => {
            _toggleFade(e);
            e.innerHTML = '';
        });
        playerOne.markers = [];
        playerTwo.markers = [];
    }

    function _endGame() {
        _resetGame();
        _toggleFade(board);
        _toggleFade(endDisplay);
        winnerName.innerHTML = winner.name;
        robotToggled = false;
        playerTwo = Player('Player Two', 'O', 'white');
    }

    return { placeMark, playerTwo, playerOne }

})();

const Gameboard = (() => {

    const { playerTwo, playerOne } = displayController;

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
