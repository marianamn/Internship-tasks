var cars = carsData.cars,
    client = clientData.client,
    store = storeData.store,
    orderBtn = getElement("#btn-order"),
    container = getElement("#container"),
    request;

store.cars = cars;
console.log("Initial store cars", store.cars);

orderBtn.addEventListener("click", function (e) {
    var isCarAvailable;

    e.preventDefault();

    client.name = getElement("#input-name").value;
    client.availableAmount = getElement("#input-price").value;
    client.wantedColor = getElement("#input-color").value;
    client.wantedType = getElement("#input-type").value;

    request = client.requestForCar();
    isCarAvailable = store.checkIfCarExist(request);

    if (isCarAvailable) {
        showClientMatchedCars();

        getElement(".order-message-error").classList.add("hidden");
        getElement(".order-form").classList.add("hidden");


    } else {
        getElement(".order-message-error").classList.remove("hidden");
    }
}, false);

function getElement(selector) {
    return document.querySelector(selector);
}

function createElement(element) {
    return document.createElement(element);
}

function showClientMatchedCars() {
    printCars(store.matchedCars, "List of matched cars:");
}

function showStoreAvailableCars() {
    printCars(store.cars, "Store available cars list:");
    getElement(".btn-buy").classList.add("hidden");
}

function printCars(items, heding) {
    var fragment = document.createDocumentFragment(),
        carsWrapperDiv = createElement("div"),
        title = createElement("h2");

    carsWrapperDiv.classList.add("cars-wrapper");

    title.textContent = heding;
    carsWrapperDiv.appendChild(title);

    for (var i = 0; i < items.length; i++) {
        var carDetailsDiv = createElement("div"),
            carDetailsAmontP = createElement("p"),
            carDetailsColorP = createElement("p"),
            carDetailsTypeP = createElement("p"),
            buyBtn = createElement("button");

        carDetailsDiv.classList.add("car-details");
        buyBtn.classList.add("btn-buy");
        buyBtn.setAttribute("data-id", items[i].id);

        carDetailsAmontP.textContent = "Price: " + items[i].price;
        carDetailsColorP.textContent = "Color: " + items[i].color;
        carDetailsTypeP.textContent = "Type: " + items[i].type;
        buyBtn.textContent = "Buy";

        carDetailsDiv.appendChild(carDetailsAmontP);
        carDetailsDiv.appendChild(carDetailsColorP);
        carDetailsDiv.appendChild(carDetailsTypeP);
        carDetailsDiv.appendChild(buyBtn);
        carsWrapperDiv.appendChild(carDetailsDiv);
        fragment.appendChild(carsWrapperDiv);

        buyBtn.addEventListener("click", function (e) {
            e.preventDefault();
            var boughtCarId = i,
                boughtCar = {};

            boughtCar.id = i;
            boughtCar.price = items[i].price;
            boughtCar.color = items[i].color;
            boughtCar.type = items[i].type;

            client.addCar(boughtCar);
            store.soldCar(boughtCarId);
            store.soldCarsList.push({
                saleDate: new Date(),
                car: boughtCar,
                owner: request.name
            });

            console.log("Initial sold cars", store.soldCarsList);
            console.log("Mached cars", store.matchedCars);
            console.log("Client bought cars", client.boughtCars);
            console.log(boughtCarId);

            getElement(".order-message-success").classList.remove("hidden");
            getElement(".cars-wrapper").classList.add("hidden");

            showStoreAvailableCars();
        }, false);
    }

    container.appendChild(fragment);
}