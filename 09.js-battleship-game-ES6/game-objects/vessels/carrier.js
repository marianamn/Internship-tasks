let Carrier = (function () {
    let shipType = "Carrier";
    const shipSize = 5;

    class CarrierClass extends Vessel{
        constructor(positionAlign, positionRow, positionCol) {
            super(shipType, shipSize, positionAlign, positionRow, positionCol)
        }
    }

    return CarrierClass;
}());