let Person = (function () {
    let first,
        last;

    class PersonClass {
        constructor(firstName, lastName) {
            if (new.target === PersonClass) {
                throw new Error('Person is abstract class and cannot be instantiated!');
            }

            first = firstName;
            last = lastName;

            this.firstName = firstName;
            this.lastName = lastName;
        }

        get firstName() {
            return first;
        }

        set firstName(value) {
            validator.validateIfString(value, 'First name');
            validator.validateNameLength(value, 'First name');

            first = value;
        }

        get lastName() {
            return last;
        }

        set lastName(value) {
            validator.validateIfString(value, 'First name');
            validator.validateNameLength(value, 'First name');

            last = value;
        }

        sayName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }

    return PersonClass;
}());