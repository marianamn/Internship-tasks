/* exported Person*/
/* global validator */
/* eslint no-console: 'off'*/

var Person = (function () {
    var first,
        last;

    function PersonClass(firstName, lastName) {
        if (this.constructor === PersonClass) {
            throw new Error('Person is abstract class and cnnot be instantiated!');
        }

        first = firstName;
        last = lastName;

        this.firstName = firstName;
        this.lastName = lastName;
        return this;
    }

    Object.defineProperties(PersonClass.prototype, {
        'firstName': {
            get: function () {
                return first;
            },
            set: function (value) {
                validator.validateIfString(value, 'First name');
                validator.validateNameLength(value, 'First name');

                first = value;
            }
        },
        'lastName': {
            get: function () {
                return last;
            },
            set: function (value) {
                validator.validateIfString(value, 'Last name');
                validator.validateNameLength(value, 'Last name');

                last = value;
            }
        }
    });

    PersonClass.prototype.sayName = sayName;

    function sayName() {
        return this.firstName + ' ' + this.lastName;
    }

    return PersonClass;
}());