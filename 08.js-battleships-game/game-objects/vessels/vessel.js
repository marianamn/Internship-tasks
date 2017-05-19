/* exported Vessel*/
/* eslint no-console: 'off'*/

var Vessel = (function () {
    var hitNumbers = 0;

    function VesselClass(type, size, positionAlign, positionRow, positionCol) {
        if (this.constructor === VesselClass) {
            throw new Error('Vessel is abstract class and cannot be instantiated!');
        }

        hitNumbers = size + 1;
        this.type = type;
        this.size = size;
        this.positionAlign = positionAlign;
        this.positionRow = positionRow;
        this.positionCol = positionCol;
        return this;
    }

    VesselClass.prototype.printVessel = printVessel;
    VesselClass.prototype.hit = hit;
    VesselClass.prototype.hasSunk = hasSunk;

    function printVessel() {
        return console.log('Vessel type: ' + this.type + ', size: ' + this.size + ', positionAlign: ' + this.positionAlign + ', row: ' + this.positionRow + ', col: ' + this.positionCol);
    }

    function hit() {
        hitNumbers -= 1;
        console.log(hitNumbers);
        return hitNumbers;
    }

    function hasSunk() {
        if (hitNumbers === 0) {
            return true;
        } else {
            return false;
        }
    }

    return VesselClass;
}());