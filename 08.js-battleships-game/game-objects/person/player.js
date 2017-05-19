/* exported Player*/
/* global Student Worker Field*/
/* eslint no-console: 'off'*/

var Player = (function (Parent) {
    var size = 10,
        shipNameCharsToShow = 3;

    function PlayerClass(type, firstName, lastName) {
        this.type = type;

        if (type === "Student") {
            Parent = Student;
        } else {
            Parent = Worker;
        }

        Parent.call(this, firstName, lastName);

        this.field = new Field(size);
        this.ships = [];
        this.sunkShips = 0;
        return this;
    }

    PlayerClass.prototype = Object.create(Parent.prototype);
    PlayerClass.prototype.constructor = PlayerClass;

    PlayerClass.prototype.sayName = sayName;
    PlayerClass.prototype.addShip = addShip;
    PlayerClass.prototype.addShips = addShips;
    PlayerClass.prototype.placeShipsOnField = placeShipsOnField;
    PlayerClass.prototype.attack = attack;
    PlayerClass.prototype.checkIfShipIsHit = checkIfShipIsHit;

    function sayName() {
        return 'Player - ' + this.type + ': ' + Parent.prototype.sayName.call(this, this.firstName, this.lastName);
    }

    function addShip(ship) {
        // before adding check for field borders
        if (ship.positionAlign === 'horizontal' && (ship.positionCol + ship.size) > this.field.size) {
            throw new Error('Ship must be placed in the fields bounderies! Choose another column location');
        } else if (ship.positionAlign === 'vertical' && (ship.positionRow + ship.size) > this.field.size) {
            throw new Error('Ship must be placed in the fields bounderies! Choose another row location');
        } else {
            this.ships.push({
                ship: ship,
                name: ship.type
            });
        }
    }

    function addShips(ships) {
        for (var i = 0; i < ships.length; i++) {
            this.addShip(ships[i]);
        }
    }

    function placeShipsOnField() {
        for (var i = 0; i < this.ships.length; i++) {
            var x = this.ships[i].ship.positionRow,
                y = this.ships[i].ship.positionCol,
                align = this.ships[i].ship.positionAlign;

            for (var j = 0; j < this.ships[i].ship.size; j++) {
                if (align === 'horizontal') {
                    this.field.update(x, j + y, this.ships[i].name.substring(0, shipNameCharsToShow));
                } else {
                    this.field.update(j + x, y, this.ships[i].name.substring(0, shipNameCharsToShow));
                }
            }
        }
    }

    function attack(attackRow, attackCol) {
        var attackPosition = {
            attackRow: attackRow,
            attackCol: attackCol
        };

        return attackPosition;
    }

    function checkIfShipIsHit(attackerPlayer, attackedPlayer, attackPosition) {
        var x = attackPosition.attackRow,
            y = attackPosition.attackCol;

        console.log(attackerPlayer + ' attacked at (' + x + ', ' + y + ')');

        if (this.field.board[x][y] !== ' 0 ' && this.field.board[x][y] !== ' X ') {
            var shipName = this.field.board[x][y];

            this.field.update(x, y, ' X ');

            for (var i = 0; i < this.ships.length; i++) {
                if (this.ships[i].name.substring(0, shipNameCharsToShow) === shipName) {
                    this.ships[i].ship.hit();

                    console.log(attackedPlayer + ' ship ' + this.ships[i].name + ' was hit.');

                    if (this.ships[i].ship.hasSunk()) {
                        this.sunkShips += 1;
                        console.log(attackedPlayer + ' ship ' + this.ships[i].name + ' has sunk.');
                    }
                }
            }
        } else {
            console.log('Attack failed!');
        }
    }

    return PlayerClass;
}(Student, Worker));