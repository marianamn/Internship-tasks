/* exported validator */
var validator = (function() {
    function checkIfPressedButtonIsNotInArray(btnValue, array) {
        var isInArray = false;

        if (array.indexOf(btnValue) === -1) {
            isInArray = true;
        }

        return isInArray;
    }

    function checkIfPressedButtonIsInArray(btnValue, array) {
        var isInArray = false;

        if (array.indexOf(btnValue) > -1) {
            isInArray = true;
        }

        return isInArray;
    }

    return {
        checkIfPressedButtonIsNotInArray: checkIfPressedButtonIsNotInArray,
        checkIfPressedButtonIsInArray: checkIfPressedButtonIsInArray
    }
}());