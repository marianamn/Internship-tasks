let Battleship = (function () {
    let shipType = "Battleship";
    const shipSize = 4;

    class BattleshipClass extends Vessel{
        constructor(positionAlign, positionRow, positionCol) {
            super(shipType, shipSize, positionAlign, positionRow, positionCol)
        }
    }

    return BattleshipClass;
}());

// var battleship = new Battleship("vertical", 1, 1);
// battleship.printVessel();