var cars = carsData.cars;
var client = clientData.client;
var store = storeData.store;

store.cars = cars;
console.log("Store initial cars:", store.cars);

$("#btn-order").on("click", function(e) {
    var request,
        isAvailable;
    e.preventDefault();

    name = $("#input-name").val();
    car = {
        amount: $("#input-price").val(),
        type: $("#input-type option:selected").val(),
        color: $("#input-color").val()
    };

    request = client.requestForCar(name, car);
    isAvailable = store.checkIfCarExist(request);

    if (isAvailable) {
        store.soldCar(request.car);
        store.soldCarsList.push({
            saleDate: new Date(),
            car: request.car,
            owner: request.name
        });

        client.addCar(request.car);
        $(".order-message-success").removeClass("hidden");
    } else {
        $(".order-message-error").removeClass("hidden");
    }

    console.log("Store available cars:", store.cars);
    console.log("Store sold cars:", store.soldCarsList);
    console.log("Client bought cars:", client.boughtCars);
});