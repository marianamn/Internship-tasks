var cars = carsData.cars,
    client = clientData.client,
    store = storeData.store,
    orderBtn = get("#btn-order"),
    container = get("#container");

store.cars = cars;

orderBtn.addEventListener("click", function(e) {
    var request,
        isCarAvailable;
    
    e.preventDefault();

    // reciving client data
    client.name = get("#input-name").value;
    client.availableAmount = get("#input-price").value;
    client.wantedColor = get("#input-color").value;
    client.wantedType = get("#input-type").value;
    
    // request and check if the car is available
    request = client.requestForCar();
    isCarAvailable = store.checkIfCarExist(request);

    if (isCarAvailable) {
        store.soldCar(request.car);
        store.soldCarsList.push({
            saleDate: new Date(),
            car: request.car,
            owner: request.name
        });

        client.addCar(request.car);

        get(".order-message-success").classList.remove("hidden");
        get(".order-form").classList.add("hidden");

        // shows client bought cars and remaining shop cars for sale
        showClientPurchaseDetails();
        showStoreAvailableCars();
    } else {
        get(".order-message-error").classList.remove("hidden");
    }

    function showClientPurchaseDetails(){
        var clientName = create("h2");
        clientName.innerHTML = "Name: " + client.name;
        container.appendChild(clientName);

        printCars(client.boughtCars);
    }

    function showStoreAvailableCars(){
        var storeAvailableCars = create("h2");
        storeAvailableCars.innerHTML = "Store available cars";
        container.appendChild(storeAvailableCars);

        printCars(store.cars);
    }
});

function get(selector){
    return document.querySelector(selector);
}

function create(element){
    return document.createElement(element);
}

function printCars(items){
    var carDetailsDiv = create("div"),
        fragment = document.createDocumentFragment();

    for(var i=0; i< items.length; i++){
        var carDetailsAmontP = create("p"),
            carDetailsColorP = create("p"),
            carDetailsTypeP = create("p");

        carDetailsAmontP.innerHTML = "Price piad: " + items[i].price;
        carDetailsColorP.innerHTML = "Car color: " + items[i].color;
        carDetailsTypeP.innerHTML = "Car type: " + items[i].type;

        fragment.appendChild(carDetailsAmontP);
        fragment.appendChild(carDetailsColorP);
        fragment.appendChild(carDetailsTypeP);
        carDetailsDiv.appendChild(fragment);
    }

    container.appendChild(carDetailsDiv);
}