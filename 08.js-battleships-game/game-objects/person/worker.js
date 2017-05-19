/* exported Worker */
/* global Person */

var Worker = (function(Parent) {
    function WorkerClass(firstName, lastName) {
        Parent.call(this, firstName, lastName);
        return this;
    }

    WorkerClass.prototype = Object.create(Parent.prototype);
    WorkerClass.prototype.constructor = WorkerClass;

    return WorkerClass;
}(Person));

// var worker = new Worker('Ivan', 'Georgiev');
// worker.sayName();