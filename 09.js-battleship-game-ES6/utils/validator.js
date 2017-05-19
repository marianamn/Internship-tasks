let validator = (function () {
    const minLength = 2,
        maxLength = 15;

    function validateIfNumber(value, name) {
        name = name || 'Value';

        if (typeof value !== 'number') {
            throw new Error(`${name} must be a number`);
        }
    }

    function validateIfUndefined(value, name) {
        name = name || 'Value';

        if (value === undefined) {
            throw new Error(`${name} annot be undefined`);
        }
    }

    function validateIfString(value, name) {
        name = name || 'Value';

        validateIfUndefined(value, name);

        if (typeof value !== 'string') {
            throw new Error(`${name} must be a string`);
        }
    }

    function validateNameLength(value, name) {
        if (value.length < minLength || value.length > maxLength) {
            throw new Error(`${name} must be between ${minLength} and ${maxLength} letters iclusive!`);
        }
    }

    return {
        validateIfNumber: validateIfNumber,
        validateIfString: validateIfString,
        validateNameLength: validateNameLength
    }
}());