let Student = (function(){
    class StudentClass extends Person{
        constructor(firstName, lastName){
            super(firstName, lastName);
        }

        say(){
            console.log('I am a student');
        }
    }

    return StudentClass;
}());

// var student = new Student('Ivan', 'Goshev');
// console.log(student.sayName());