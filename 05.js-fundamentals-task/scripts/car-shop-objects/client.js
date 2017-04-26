var clientData = (function() {
    var client = {
        name: String,
        availableAmount: Number,
        wantedType: String,
        wantedColor: String,
        boughtCars: [],
        requestForCar: function() {
            var request = {
                name: this.name,
                car: {
                    price: this.availableAmount,
                    type: this.wantedType,
                    color: this.wantedColor
                }
            };

            return request;
        },
        addCar: function(car) {
            this.boughtCars.push(car);
        }
    }

    return {
        client: client
    }
}())