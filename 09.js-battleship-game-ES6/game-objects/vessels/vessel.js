let Vessel = (function () {
    let hitNumbers = 0;
    const increaser = 1;

    class VesselClass {
        constructor(type, size, positionAlign, positionRow, positionCol) {
            if (new.target === VesselClass) {
                throw new Error('Vessel is abstract class and cannot be instantiated!');
            }

            hitNumbers = size + increaser;
            this.type = type;
            this.size = size;
            this.positionAlign = positionAlign;
            this.positionRow = positionRow;
            this.positionCol = positionCol;
        }

        printVessel() {
            return console.log(`Vessel type: ${this.type}, size:  ${this.size}, positionAlign: ${this.positionAlign}, row:  ${this.positionRow}, col: ${this.positionCol}`);
        }

        hit() {
            hitNumbers -= 1;
            //console.log(hitNumbers);
            return hitNumbers;
        }

        hasSunk() {
            if (hitNumbers === 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    return VesselClass;
}());

//let vessel = new Vessel();