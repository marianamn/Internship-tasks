//validations

// strings between 3 and 20 characters
function nameLengthValidation(text) {
    var validName = true;
    if (text.length < 3 || text.length > 20) {
        validName = false;
    }
    return validName;
}

//strings containing only Latin letters
function characterValidation(text) {
    return /^[a-zA-Z]+$/.test(text);
}

//valid type is any non-empty string that contains only Latin letters and digits
function isValidType(type) {
    return type.length &&
           isString(type) &&
           /^[A-Z\d]+$/i.test(type);
}

//non-empty string for a name that contains only Latin letters and digits or dashes (-)
function isValidAttribute(attribute) {
    return attribute.length &&
           isString(attribute) &&
           /^[A-Z\d\-]+$/i.test(attribute);
}

//age validation
function ageValidation(number) {
    var validAge = true;
    if (number < 0 || number > 150) {
        validAge = false;
    }
    return validAge;
}

//checking if a string is blank, null or undefined
function validateTitle(str) {
    return (!str || /^\s*$/.test(str));
}

//checking if a string starts with an upper case letter and all other symbols are lowercase letters
function isNameValid(name) {
    var valid = true;

    if (!(/^[A-Z][a-z]*$/.test(name))) {
        valid = false;
    }

    return valid;
}

//Audio player validations
validator = {
    validateIfUndefined: function (val, name) {
        name = name || 'Value';
        if (val === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    },
    validateIfObject: function (val, name) {
        name = name || 'Value';
        if (typeof val !== 'object') {
            throw new Error(name + ' must be an object');
        }
    },
    validateIfNumber: function (val, name) {
        name = name || 'Value';
        if (typeof val !== 'number') {
            throw new Error(name + ' must be a number');
        }
    },
    validateString: function (val, name) {
        name = name || 'Value';
        this.validateIfUndefined(val, name);

        if (typeof val !== 'string') {
            throw new Error(name + ' must be a string');
        }

        if (val.length < CONSTANTS.TEXT_MIN_LENGTH
            || CONSTANTS.TEXT_MAX_LENGTH < val.length) {
            throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
        }
    },
    validatePositiveNumber: function (val, name) {
        name = name || 'Value';
        this.validateIfUndefined(val, name);
        this.validateIfNumber(val, name);

        if (val <= 0) {
            throw new Error(name + ' must be positive number');
        }
    },
    validateImdbRating: function (val) {
        this.validateIfUndefined(val, 'IMDB Rating');
        this.validateIfNumber(val, 'IMDB Rating');

        if (val < CONSTANTS.IMDB_MIN_RATING || CONSTANTS.IMDB_MAX_RATING < val) {
            throw new Error('IMDB Rating must be between '
                + CONSTANTS.IMDB_MIN_RATING
                + ' and ' + CONSTANTS.IMDB_MAX_RATING);
        }
    },
    validateId: function (id) {
        this.validateIfUndefined(id, 'Object id');
        if (typeof id !== 'number') {
            id = id.id;
        }

        this.validateIfUndefined(id, 'Object must have id');
        return id;
    },
    validatePageAndSize: function (page, size, maxElements) {
        this.validateIfUndefined(page);
        this.validateIfUndefined(size);
        this.validateIfNumber(page);
        this.validateIfNumber(size);

        if (page < 0) {
            throw new Error('Page must be greather than or equal to 0');
        }

        this.validatePositiveNumber(size, 'Size');

        if (page * size > maxElements) {
            throw new Error('Page * size will not return any elements from collection');
        }
    }
};
