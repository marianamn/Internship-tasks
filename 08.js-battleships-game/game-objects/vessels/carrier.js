/* exported Carrier*/
/* global Vessel*/
/* eslint no-console: "off"*/

var Carrier = (function (Parent) {
    var shipType = "Carrier",
        shipSize = 5;

    function CarrierShip(positionAlign, positionRow, positionCol) {
        Parent.call(this, shipType, shipSize, positionAlign, positionRow, positionCol);
        return this;
    }

    CarrierShip.prototype = Object.create(Parent.prototype);
    CarrierShip.prototype.constructor = CarrierShip;

    return CarrierShip;
}(Vessel));