const Gameboard = (() => {

    // Initialize gameboard array
    const board = ['', '', '', '', '', '', '', '', ''];

    // Creates a NodeList, and turn into an array to gain the built-in methods attached to arrays
    const boardSquares = [...document.querySelectorAll('.board-item')];

    // Take the board array, and render it to the DOM through the boardSquares
    const render = () => {
        for (let i = 0; i < board.length; i++) {
            boardSquares[i].innerHTML = board[i];
        }
    }

    const updateBoard = () => {
        console.log(this);
        // const index = boardSquares.indexOf(this)
        // this.innerHTML = 'X';
        // board[index] = 'X';
    }

    return { render, board, boardSquares, updateBoard }

})();


const displayController = (() => {

    const { boardSquares, board, updateBoard } = Gameboard;

    // Add event listener to each board piece
    boardSquares.forEach(element => {
        element.addEventListener('click', updateBoard.bind(element))
    });



})();

