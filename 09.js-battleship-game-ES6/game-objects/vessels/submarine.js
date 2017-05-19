let Submarine = (function () {
    let shipType = "Submarine";
    const shipSize = 3;

    class SubmarineClass extends Vessel{
        constructor(positionAlign, positionRow, positionCol) {
            super(shipType, shipSize, positionAlign, positionRow, positionCol)
        }
    }

    return SubmarineClass;
}());