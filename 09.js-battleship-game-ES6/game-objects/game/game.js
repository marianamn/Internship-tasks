let Game = (function () {
    let numberOfShipsperPlayer = 5;

    class GameClass {
        constructor() {
            this.players = [];
        }

        addPlayer(player) {
            this.players.push(player);
        }

        createPlayersFields() {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].field.create();
            }
        }

        placePlayersShipsOnField() {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].placeShipsOnField();

                console.log('Player ' + Number(i + 1) + ' field:');
                this.players[i].field.print();
            }
        }

        checkIfGameOver() {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].sunkShips === numberOfShipsperPlayer) {
                    console.log('Game over!');
                    console.log('Player ' + Number(i + 1) + ' wins!');
                }
            }
        }
    }

    return GameClass;
}());