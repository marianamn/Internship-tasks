var vehicle = (function () {
    function validateNames(name) {
        if (!name.length){
            throw new Error('Name must be non empty string!')
        }
        else if(name.length < 3 || name.length > 20){
            throw new Error('Name must be between 3 and 20 letters!')
        }
        else if(!(/^[A-Z][a-z]*$/.test(name))){
            throw new Error('Name must start with capital letter!')
        }
    }

    var vehicle = {};

    Object.defineProperty(vehicle, 'init', {
        value: function (brand, sellerName) {
            this.brand = brand;
            this.sellerName = sellerName;
            //this.listWithVehicles = [];
            return this;
        }
    })

    Object.defineProperty(vehicle, 'brand', {
        get: function () {
            return this._brand;
        },
        set: function (value) {
            validateNames(value);

            this._brand = value;
        }
    })

    Object.defineProperty(vehicle,'sellerName',{
        get: function () {
            return this._sellerName;
        },
        set: function (value) {
            validateNames(value);

            this._sellerName = value;
        }
    })

    Object.defineProperty(vehicle, 'move', {
        value: function () {
            return this.brand + ' is moving...'
        }
    })

    //Object.defineProperty(vehicle, 'addVehicle', {
    //    value: function (vehicle) {
    //        this.listWithVehicles.push(vehicle);
    //
    //        return this.listWithVehicles.slice();
    //    }
    //})

    return vehicle;
}());

var car = (function (parent) {
    var car = Object.create(parent);

    Object.defineProperty(car, 'wheels', {
        get: function () {
            return this._wheels;
        },
        set: function (value) {
            if (value !== 4) {
                throw new Error('Car has 4 wheels!')
            }

            this._wheels = value;
        }
    })

    Object.defineProperty(car, 'init', {
        value: function (brand, sellerName, wheels) {
            parent.init.call(this, brand, sellerName);
            this.wheels = wheels;
            return this;
        }
    });

    //car.init = function (brand, wheels) {
    //    parent.init.call(this, brand);
    //    this.wheels = wheels;
    //    return this;
    //}

    Object.defineProperty(car, 'move', {
        value: function () {
            return parent.move.call(this) + ' with ' + this.wheels + ' wheels';
        }
    })

    //car.move = function () {
    //    return parent.move.call(this) + ' with ' + this.wheels + ' wheels';
    //}

    return car;
}(vehicle));

var bicycle = (function (parent) {
    var bicycle = Object.create(parent);

    Object.defineProperty(bicycle, 'init', {
        value: function (brand, sellerName, price) {
            parent.init.call(this, brand, sellerName);
            this.price = price;
            return this;
        }
    })

    Object.defineProperty(bicycle, 'price', {
        get: function () {
            return this._price;
        },
        set: function (value) {
            if (value < 0) {
                throw new Error ('Price can not be negative number!')
            }

            this._price = value;
        }
    })

    return bicycle;
}(vehicle));

var scooter = (function (parent) {
    var scooter = Object.create(parent);

    Object.defineProperty(scooter, 'init', {
        value: function (brand, sellerName, price) {
            parent.init.call(this, brand, sellerName, price);
            return this;
        }
    })

    Object.defineProperty(scooter, 'sayHello', {
        value: function () {
            return 'Hello I am a scooter sold by ' + this.sellerName;
        }
    })

    return scooter;
}(bicycle));

var someVehicle = Object.create(vehicle).init('Mercedes','Pesho');
console.log(someVehicle);
console.log(someVehicle.move());

var someCar = Object.create(car).init('Audi', 'Gosho', 4);
console.log(someCar);
console.log(someCar.move());

var someBicycle = Object.create(bicycle).init('Begach', 'Mimi', 100);
console.log(someBicycle);

var someScooter = Object.create(scooter).init('Mfffff', 'Jkkkk', 200);
console.log(someScooter);
console.log(someScooter.sayHello());