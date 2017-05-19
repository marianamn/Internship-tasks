/* exported Student */
/* global Person */

var Student = (function(Parent) {
    function StudentClass(firstName, lastName) {
        Parent.call(this, firstName, lastName);
        return this;
    }

    StudentClass.prototype = Object.create(Parent.prototype);
    StudentClass.prototype.constructor = StudentClass;

    return StudentClass;
}(Person));

// var student = new Student('Ivan', 'Goshev');
// console.log(student.sayName());