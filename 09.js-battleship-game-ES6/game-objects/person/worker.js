let Worker = (function () {
    class WorkerClass extends Person {
        constructor(firstName, lastName) {
            super(firstName, lastName);
        }

        say() {
            console.log('I am a worker');
        }
    }

    return WorkerClass;
}());