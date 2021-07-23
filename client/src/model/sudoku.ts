

export default class Sudoku {

    board: number[][]
    reset: number[][]
    constructor(board: number[][]) {
        this.reset = JSON.parse(JSON.stringify(board));
        this.board = JSON.parse(JSON.stringify(board)); //deep copy
    }
    resetBoard() {
        return this.reset;

    }
    getBoard() {
        return this.board;
    }
    solveSudoku() {
        this.solve(this.board, 0, 0);
    }
    isValid(board: number[][], row: number, col: number, val: number) {
        //looking at the row only
        for (let i of board[row]) {
            if (i === val) {
                return false;
            }
        }
        //looking vertically
        for (let i of board) {
            if (i[col] === val) {
                return false;
            }
        }
        let rowbox = Math.floor(row / 3)
        let colbox = Math.floor(col / 3)
        for (let i = rowbox * 3; i < (rowbox + 1) * 3; i++) {
            for (let j = colbox * 3; j < (colbox + 1) * 3; j++) {

                if (board[i][j] === val) {
                    return false;
                }
            }
        }
        return true;

    }
    solve(board: number[][], row: number, col: number): Boolean {
        if (row === board.length) {
            return true;
        }
        let newrow = row;
        let newcol = col + 1;
        if (col === board[0].length - 1) {
            newrow += 1
            newcol = 0
        }
        if (board[row][col] !== 0) {
            return this.solve(board, newrow, newcol)
        }


        for (let i = 1; i < 10; i++) {
            if (this.isValid(board, row, col, i)) {
                board[row][col] = i;
                if (this.solve(board, newrow, newcol)) {
                    return true;
                }

                board[row][col] = 0;
            }

        }
        return false;

    }
}

// module.exports = { Sudoku }