let Field = (function () {
    class FieldClass {
        constructor(size) {
            this.size = size;
            this.board = [];
        }

        create() {
            for (var i = 0; i < this.size; i++) {
                this.board[i] = [];
                for (let j = 0; j < this.size; j++) {
                    this.board[i][j] = ' 0 ';
                }
            }

            return this.board;
        }

        update(row, col, value) {
            this.board[row][col] = value;
        }

        print() {
            let row = '',
                result = '';

            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    row += this.board[i][j] + ' ';
                }
                result += row + '\n';
                row = '';
            }

            console.log(result);
        }
    }

    return FieldClass;
}());