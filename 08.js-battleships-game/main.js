/* global Player Game Battleship Carrier Cruiser Destroyer Submarine*/
/* eslint no-console: 'off'*/

var game = new Game(),
    firstPlayer = new Player('Student', 'Ivan', 'Petrov'),
    secondPlayer = new Player('Worker', 'Hristo', 'Todorov'),
    attackPosition;

var firstPlayerShips = [
    new Battleship("vertical", 0, 1),
    new Carrier("horizontal", 6, 3),
    new Cruiser("vertical", 7, 1),
    new Destroyer("horizontal", 1, 7),
    new Submarine("vertical", 3, 9)
];

var secondPlayerShips = [
    new Battleship("horizontal", 1, 1),
    new Carrier("horizontal", 9, 4),
    new Cruiser("vertical", 3, 8),
    new Destroyer("horizontal", 8, 3),
    new Submarine("vertical", 4, 0)
];

// cteate 2 Players
game.addPlayer(firstPlayer);
game.addPlayer(secondPlayer);

// cteate Players fields
game.createPlayersFields();

// place Players ships on each field
firstPlayer.addShips(firstPlayerShips);
secondPlayer.addShips(secondPlayerShips);
game.placePlayersShipsOnField();

// attack
// simulate ships sunk
attackPosition = firstPlayer.attack(1, 5);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(1, 1);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(1, 2);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(1, 3);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(1, 4);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

// second ship
attackPosition = firstPlayer.attack(4, 0);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(5, 0);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

attackPosition = firstPlayer.attack(6, 0);
secondPlayer.checkIfShipIsHit('First Player', 'Second Player', attackPosition);

secondPlayer.field.print();

// check after each attack?
game.checkIfGameOver();