// Кола (5 на брой, с различни характеристики) - с пропъртита за:
//     * цена;
//     * тип кола (estate, SUV, convertible);
//     * цвят;
//     * продава се (boolean, сетва се при осъществяване на продажба);

var carsData = (function() {
    var cars = [],
        newCar = {},
        colors = ["red", "black", "white", "green", "yellow"],
        types = ["estate", "SUV", "convertable"],
        numberOfCars = 5,
        index = 0,
        i = 0;

    for (i = 0; i < numberOfCars; ++i) {
        index = i;
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