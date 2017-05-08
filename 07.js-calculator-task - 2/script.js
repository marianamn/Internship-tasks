var btnOpenToggle,
    btnCloseToggle,
    menu,
    optionsList,
    option,
    advancedElements,
    elementsList;

function initialize() {
    return {
        btnOpenToggle: document.querySelector(".toggle"),
        btnCloseToggle: document.querySelector(".close-toggle"),
        menu: document.querySelector("#menu"),
        optionsList: document.getElementById("options-list"),
        option: document.querySelector(".calculator-option"),
        advanced: document.querySelectorAll(".advanced"),
        btnDel: document.querySelector(".del"),
    }
}

elementsList = initialize();

menu = elementsList.menu;
optionsList = elementsList.optionsList;
btnOpenToggle = elementsList.btnOpenToggle;

btnOpenToggle.addEventListener("click", function(e) {
    e.preventDefault();
    menu.classList.remove("hidden");

    optionsList.addEventListener("click", changeCalculatorView);
})

function changeCalculatorView(e) {
    e.preventDefault();
    var item,
        del;

    item = e.target.textContent;
    option = elementsList.option;
    option.textContent = item;
    advancedElements = elementsList.advanced;
    del = elementsList.btnDel;

    for (var i = 0; i < advancedElements.length; i++) {
        document.querySelector(".selected").classList.remove("selected");
        e.target.parentNode.className = "selected";

        if (item === "Standard") {
            advancedElements[i].classList.add("hidden");
            del.classList.remove("del-advanced");
            del.classList.add("del-standard");
        } else if (item === "Advanced") {
            advancedElements[i].classList.remove("hidden");
            del.classList.remove("del-standard");
            del.classList.add("del-advanced");
        }
    }

    menu.classList.add("hidden");
}

btnCloseToggle = elementsList.btnCloseToggle;
btnCloseToggle.addEventListener("click", function(e) {
    e.preventDefault();
    menu.classList.add("hidden");
})