function createPlayer (parentType) {
    const size = 10,
        shipNameCharsToShow = 3;

    function getParentClass(type) {
        return type == 'Student' ? Student : Worker
    }

    class Player extends getParentClass(parentType) {
        constructor(firstName, lastName) {
            super(firstName, lastName);

            this.field = new Field(size);
            this.ships = [];
            this.sunkShips = 0;
        }

        sayName() {
            return 'Player - ' + parentType + ': ' + super.sayName();
        }

        addShip(ship) {
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

        addShips(ships) {
            for (let i = 0; i < ships.length; i++) {
                this.addShip(ships[i]);
            }
        }

        placeShipsOnField() {
            for (let i = 0; i < this.ships.length; i++) {
                let x = this.ships[i].ship.positionRow,
                    y = this.ships[i].ship.positionCol,
                    align = this.ships[i].ship.positionAlign;

                for (let j = 0; j < this.ships[i].ship.size; j++) {
                    if (align === 'horizontal') {
                        this.field.update(x, j + y, this.ships[i].name.substring(0, shipNameCharsToShow));
                    } else {
                        this.field.update(j + x, y, this.ships[i].name.substring(0, shipNameCharsToShow));
                    }
                }
            }
        }

        attack(attackRow, attackCol) {
            var attackPosition = {
                attackRow: attackRow,
                attackCol: attackCol
            };

            return attackPosition;
        }

        checkIfShipIsHit(attackerPlayer, attackedPlayer, attackPosition) {
            let x = attackPosition.attackRow,
                y = attackPosition.attackCol;

            console.log(`${attackerPlayer} attacked at (${x}, ${y})`);

            if (this.field.board[x][y] !== ' 0 ' && this.field.board[x][y] !== ' X ') {
                let shipName = this.field.board[x][y];

                this.field.update(x, y, ' X ');

                for (let i = 0; i < this.ships.length; i++) {
                    if (this.ships[i].name.substring(0, shipNameCharsToShow) === shipName) {
                        this.ships[i].ship.hit();

                        console.log(`${attackedPlayer} ship ${this.ships[i].name} was hit.`);

                        if (this.ships[i].ship.hasSunk()) {
                            this.sunkShips += 1;
                            console.log(`${attackedPlayer} ship ${this.ships[i].name} has sunk.`);
                        }
                    }
                }
            } else {
                console.log('Attack failed!');
            }
        }
    }

    return Player;
};