/* exported Cruiser*/
/* global Vessel*/
/* eslint no-console: "off"*/

var Cruiser = (function (Parent) {
    var shipType = "Cruiser",
        shipSize = 3;

    function CruiserVessel(positionAlign, positionRow, positionCol) {
        Parent.call(this, shipType, shipSize, positionAlign, positionRow, positionCol);
        return this;
    }

    CruiserVessel.prototype = Object.create(Parent.prototype);
    CruiserVessel.prototype.constructor = CruiserVessel;

    return CruiserVessel;
}(Vessel));