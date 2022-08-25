let svg = document.querySelector('svg');
let path = document.querySelector('path');
let container = document.querySelector('section:nth-child(1)')
let button = document.querySelector('.icon')
let color;

function matchLines(winner, board) {

    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
    let pattern, direction, index;
    let svgLines = {

        horizontal: ['M0 23.5, 100 23.5', 'M0 50, 100 50', 'M0 76.5, 100 76.5'],
        vertical: ['M23 0, 23 100', 'M50 0, 50 100', 'M76.5 0, 76.5 100'],
        diagonal: ['M15 15, 110 110', 'M85 15, 0 100']
    }

    let horizontal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    let vertical = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    let diagonal = [[0, 4, 8], [2, 4, 6]];

    let player1 = [], player2 = [];
    for (let i = 0; i < Gameboard.board.length; i++) {
        if (board[i] == winner.mark) {
            player1.push(i)
        } else if (board[i] && board[i] != winner.mark) {
            player2.push(i)
        }
    }

    const checker = (arr, target) => target.every(v => arr.includes(v));

    for (let i = 0; i < winningPatterns.length; i++) {
        if (checker(player1, winningPatterns[i])) {
            pattern = winningPatterns[i];
        }
    }

    if (pattern) {

        for (let i = 0; i < horizontal.length; i++) {
            if (checker(pattern, horizontal[i])) {
                direction = 'horizontal';
                index = i;
            }
        }
        for (let i = 0; i < vertical.length; i++) {
            if (checker(pattern, vertical[i])) {
                direction = 'vertical';
                index = i;
            }
        }
        for (let i = 0; i < diagonal.length; i++) {
            if (checker(pattern, diagonal[i])) {
                direction = 'diagonal';
                index = i;
            }
        }

        for (let i = 0; i < pattern.length; i++) {

            let winningMark = document.querySelector(`.board-item:nth-child(${pattern[i] + 1}) > span`);
            winningMark.style.fontSize = '5rem';

        }

        player2.forEach(element => {

            let losingMark = document.querySelector(`.board-item:nth-child(${element + 1}) > span`);
            losingMark.style.opacity = '0.2';
        });

    }

    return svgLines[direction][index];

}

function displayLine(winner, board) {
    container.style.zIndex = '1';
    path.classList.remove('hidden');
    path.classList.add('key-anim1');
    let lineDirection = matchLines(winner, board);
    path.setAttribute('stroke', `${winner.color}`)
    path.setAttribute('d', `${lineDirection}`);
}
