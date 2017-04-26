var storeData = (function() {
    var store = {
        cars: [],
        soldCarsList: [],
        soldCar: function(car) {
            var index = 0;
            
            for (var i = 0; i < this.cars.length; ++i) {
                if (this.cars[i].price === car.price &&
                    this.cars[i].type === car.type.toLowerCase() &&
                    this.cars[i].color === car.color.toLowerCase()) {
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
                    break;
                }
            }

            return isCarInTheStore;
        }
    }

    return {
        store: store
    }
}());