/* exported Field*/
/* eslint no-console: 'off'*/

var Field = (function () {
    function FieldClass(size) {
        this.size = size;
        this.board = [];
        return this;
    }

    FieldClass.prototype.create = create;
    FieldClass.prototype.update = update;
    FieldClass.prototype.print = print;

    function create() {
        for (var i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.size; j++) {
                this.board[i][j] = ' 0 ';
            }
        }

        return this.board;
    }

    function update(row, col, value) {
        this.board[row][col] = value;
    }

    function print() {
        var row = '',
            result = '';

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                row += this.board[i][j] + ' ';
            }
            result += row + '\n';
            row = '';
        }

        console.log(result);
    }

    return FieldClass;
}());