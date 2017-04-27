var storeData = (function() {
    var store = {
        cars: [],
        soldCarsList: [],
        matchedCars: [],
        soldCar: function(id) {
            var index = 0;
            
            for (var i = 0; i < this.cars.length; ++i) {
                if (this.cars[i].id === id) {
                    index = i;
                    break;
                }
            }

            this.cars.splice(index, 1);
        },
        checkIfCarExist: function(request) {
            var price = request.car.price,
                type = request.car.type.toLowerCase(),
                color = request.car.color.toLowerCase(),
                isCarInTheStore = false;

            for (var i = 0; i < this.cars.length; ++i) {
                if (this.cars[i].price <= price &&
                    this.cars[i].type === type &&
                    this.cars[i].color === color) {
                    isCarInTheStore = true;
                    this.matchedCars.push(cars[i]);
                }
            }

            return isCarInTheStore;
        }
    }

    return {
        store: store
    }
}());