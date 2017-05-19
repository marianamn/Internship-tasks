let Destroyer = (function () {
    let shipType = "Destroyer";
    const shipSize = 2;

    class DestroyerClass extends Vessel{
        constructor(positionAlign, positionRow, positionCol) {
            super(shipType, shipSize, positionAlign, positionRow, positionCol)
        }
    }

    return DestroyerClass;
}());