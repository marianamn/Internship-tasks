/* exported Submarine*/
/* global Vessel*/
/* eslint no-console: "off"*/

var Submarine = (function (Parent) {
    var shipType = "Submarine",
        shipSize = 3;

    function SubmarineVessel(positionAlign, positionRow, positionCol) {
        Parent.call(this, shipType, shipSize, positionAlign, positionRow, positionCol);
        return this;
    }

    SubmarineVessel.prototype = Object.create(Parent.prototype);
    SubmarineVessel.prototype.constructor = SubmarineVessel;

    return SubmarineVessel;
}(Vessel));