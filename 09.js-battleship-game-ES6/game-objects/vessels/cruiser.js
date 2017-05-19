let Cruiser = (function () {
    let shipType = "Cruiser";
    const shipSize = 3;

    class CruiserClass extends Vessel{
        constructor(positionAlign, positionRow, positionCol) {
            super(shipType, shipSize, positionAlign, positionRow, positionCol)
        }
    }

    return CruiserClass;
}());