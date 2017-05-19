/* exported Destroyer*/
/* global Vessel*/
/* eslint no-console: "off"*/

var Destroyer = (function (Parent) {
    var shipType = "Destroyer",
        shipSize = 2;

    function DestroyerVessel(positionAlign, positionRow, positionCol) {
        Parent.call(this, shipType, shipSize, positionAlign, positionRow, positionCol);
        return this;
    }

    DestroyerVessel.prototype = Object.create(Parent.prototype);
    DestroyerVessel.prototype.constructor = DestroyerVessel;

    return DestroyerVessel;
}(Vessel));