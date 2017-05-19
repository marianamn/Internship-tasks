/* exported Game*/
/* eslint no-console: 'off'*/

var Game = (function () {
    var numberOfShipsperPlayer = 5;

    function GameClass() {
        this.players = [];
        return this;
    }

    GameClass.prototype.addPlayer = addPlayer;
    GameClass.prototype.createPlayersFields = createPlayersFields;
    GameClass.prototype.placePlayersShipsOnField = placePlayersShipsOnField;
    GameClass.prototype.checkIfGameOver = checkIfGameOver;

    function addPlayer(player) {
        this.players.push(player);
    }

    function createPlayersFields() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].field.create();
        }
    }

    function placePlayersShipsOnField() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].placeShipsOnField();

            console.log('Player ' + Number(i + 1) + ' field:');
            this.players[i].field.print();
        }
    }

    function checkIfGameOver() {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].sunkShips === numberOfShipsperPlayer) {
                console.log('Game over!');
                console.log('Player ' + Number(i + 1) + ' wins!');
            }
        }
    }

    return GameClass;
}());