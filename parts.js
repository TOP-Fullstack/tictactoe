(function () {

    const Gameboard = {

        board: ['', '', '', '', '', '', '', '', ''],

        boardSquares: [...document.querySelectorAll('.board-item')],

        winningCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]],

        init: function () {
            this.bindEvents();
            this.render();
        },

        bindEvents: function () {
            this.boardSquares.forEach(element => {
                element.addEventListener('click', this.updateBoard)
            });
        },

        render: function () {
            for (let i = 0; i < this.board.length; i++) {
                this.boardSquares[i].innerHTML = this.board[i];
            }
        },

        updateBoard: function () {

            // Save current context from previous call (i.e. the boardsquare that called this function)
            const that = this;

            // Invoke new context attached to the Gameboard object, and find the index of the the element that has been clicked, re-render the board
            (function () {
                let index = this.boardSquares.indexOf(that);
                this.board[index] = 'X';
                this.render();
                this.checkWinner();
            }).call(Gameboard)

        },

        checkWinner: function () {

            // Keep track of the marked board pieces
            const marked = [];
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i]) marked.push(i);
            }

            // A function to check whether all items in the second argument are present within the first
            let checker = (arr, target) => target.every(v => arr.includes(v));

            // Loop through all possible winning combinations, and check if they match the marked items
            for (let i = 0; i < this.winningCombinations.length; i++) {
                if (checker(marked, this.winningCombinations[i])) alert('winner');
            }

        }

    }

    Gameboard.init();


})();
