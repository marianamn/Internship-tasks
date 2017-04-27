var carsData = (function() {
    var cars = [],
        newCar = {},
        colors = ["red", "black", "white", "green", "red"],
        types = ["estate", "SUV", "convertable"],
        numberOfCars = 5,
        index = 0,
        i = 0;

    // create 5 different cars
    for (i = 0; i < numberOfCars; ++i) {
        index = i;
        newCar.id = i + 1;
        newCar.price = 1000 + i * 100;

        if (index > 2) {
            index = 0;
        }
        newCar.type = types[index];
        newCar.color = colors[i];
        newCar.forSale = true;

        cars.push(newCar);
        newCar = {};
    }

    return {
        cars: cars
    }
}());