/* exported Battleship*/
/* global Vessel*/
/* eslint no-console: "off"*/

var Battleship = (function (Parent) {
    var shipType = "Battleship",
        shipSize = 4;

    function BattleshipVessel(positionAlign, positionRow, positionCol) {
        Parent.call(this, shipType, shipSize, positionAlign, positionRow, positionCol);
        return this;
    }

    BattleshipVessel.prototype = Object.create(Parent.prototype);
    BattleshipVessel.prototype.constructor = BattleshipVessel;


    return BattleshipVessel;
}(Vessel));

// var battleship = new Battleship("vertical", 1, 1);
// battleship.printVessel();