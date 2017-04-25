// Клиент - 
//   с пропъртита за:
//     * налични средства;
//     * желание за тип кола;
//     * желание за цвят кола;
//     * закупена кола, съдържащо нейните данни, ако има вече такава;
//   с методи за:
//     * задаване на запитване към магазина, според критериите (налични пари, тип на кола, цвят на кола);
//     * задаване на закупената кола към пропъртито за закупена кола;

var clientData = (function() {
    var client = {
        name: String,
        availableAmount: Number,
        wantedType: String,
        wantedColor: String,
        boughtCars: [],
        requestForCar: function(name, car) {
            var request = {
                name: name,
                car: {
                    amount: car.amount,
                    type: car.type,
                    color: car.color
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