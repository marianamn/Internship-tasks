// Магазин - 
//   с пропъртита за:
//     * наличен инвентар от коли;
//     * списък с продадени коли, съдържащ данни за покупката (време - ден и час; 
//     данни за купената кола; данни за новия собственик);
//   с методи за:
//     * продаване на кола - ъпдейтва наличния инвентар от коли и списъка с продадените такива;
//     * проверка, дали кола с критериите на клиента (налични пари на клиента; тип на колата, която иска; 
//     цвят на колата, която иска) съществува, преди да му бъде продадена;

var storeData = (function() {
    var store = {
        cars: [],
        soldCarsList: [],
        soldCar: function(car) {
            var index = cars.indexOf(car);
            car.forSale = false;

            this.cars.splice(index, 1);
        },
        checkIfCarExist: function(request) {
            var name = request.name,
                amount = request.car.amount,
                type = request.car.type.toLowerCase(),
                color = request.car.color.toLowerCase(),
                isExist = false;

            for (var i = 0; i < this.cars.length; ++i) {
                if (this.cars[i].price <= amount &&
                    this.cars[i].type === type &&
                    this.cars[i].color === color) {
                    isExist = true;
                    break;
                }
            }

            return isExist;
        }
    }

    return {
        store: store
    }
}());