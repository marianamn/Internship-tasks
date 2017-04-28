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
});

function getElement(selector) {
    return document.querySelector(selector);
}

function createElement(element) {
    return document.createElement(element);
}

function showClientMatchedCars() {
    printCars(store.matchedCars, "Matched cars:", "matched");
}

function showStoreAvailableCars() {
    printCars(store.cars, "Store remaining available cars:", "available");
}

function printCars(items, heading, selector) {
    var fragment = document.createDocumentFragment(),
        carsWrapperDiv = createElement("div"),
        detailsWrapperDiv = createElement("div")
    title = createElement("h2");

    carsWrapperDiv.classList.add("cars-wrapper");
    detailsWrapperDiv.classList.add("cars-details-wrapper");

    title.textContent = heading;
    carsWrapperDiv.appendChild(title);

    for (var i = 0; i < items.length; i++) {
        var carDetailsDiv = createElement("div"),
            carDetailsAmontP = createElement("p"),
            carDetailsColorP = createElement("p"),
            carDetailsTypeP = createElement("p"),
            curentCar;

        carDetailsDiv.classList.add("car-details");
        carDetailsAmontP.textContent = "Price: " + items[i].price;
        carDetailsColorP.textContent = "Color: " + items[i].color;
        carDetailsTypeP.textContent = "Type: " + items[i].type;

        carDetailsDiv.appendChild(carDetailsAmontP);
        carDetailsDiv.appendChild(carDetailsColorP);
        carDetailsDiv.appendChild(carDetailsTypeP);

        if (selector === "matched") {
            var buyBtn = createElement("button");

            buyBtn.classList.add("btn-buy");
            buyBtn.setAttribute("data-id", items[i].id);
            buyBtn.textContent = "Buy";
            carDetailsDiv.appendChild(buyBtn);

            buyBtn.addEventListener("click", buySelectedCar);
        }

        detailsWrapperDiv.appendChild(carDetailsDiv);
        carsWrapperDiv.appendChild(detailsWrapperDiv);
        fragment.appendChild(carsWrapperDiv);
    }

    container.appendChild(fragment);
}

function buySelectedCar(e) {
    e.preventDefault();

    var currentId = Number(e.target.getAttribute("data-id"));
    boughtCar = {};

    for (var i = 0; i < store.cars.length; i++) {
        if (store.cars[i].id === currentId) {
            boughtCar = store.cars[i];
            break;
        }
    }

    client.addCar(boughtCar);
    store.soldCar(boughtCar.id);
    store.soldCarsList.push({
        saleDate: new Date(),
        car: boughtCar,
        owner: request.name
    });

    getElement(".order-message-success").classList.remove("hidden");
    getElement(".cars-wrapper").classList.add("hidden");

    showStoreAvailableCars();
}