var menu = (function () {
    var subMenu,
        elementsList;

    function initializeElements() {
        return {
            subMenu: document.querySelector(".sub-menu"),
            option: document.querySelector(".calculator-option"),
            optionsList: document.querySelector(".options-list"),
            advanced: document.querySelectorAll(".advanced"),
            selectedElement: document.querySelector(".selected")
        }
    }

    elementsList = initializeElements();
    subMenu = elementsList.subMenu;

    function openSubMenu(e) {
        e.preventDefault();

        var optionsList = elementsList.optionsList;
        optionsList.addEventListener("click", changeCalculatorView);

        subMenu.classList.remove("hidden");
    }

    function changeCalculatorView(e) {
        e.preventDefault();
        var item = e.target.textContent,
            option = elementsList.option,
            advancedElements = elementsList.advanced;

        option.textContent = item;

        for (var i = 0; i < advancedElements.length; i++) {
            var selectedElement = elementsList.selectedElement;

            selectedElement.classList.remove("selected");
            e.target.parentNode.className = "selected";

            if (item === "Standard") {
                advancedElements[i].classList.add("hidden");
            } else if (item === "Advanced") {
                advancedElements[i].classList.remove("hidden");
            }
        }

        subMenu.classList.add("hidden");
    };

    function closeSubMenu(e) {
        e.preventDefault();
        selectedElement.classList.remove("selected");

        subMenu.classList.add("hidden");
    }

    return {
        openSubMenu: openSubMenu,
        closeSubMenu: closeSubMenu
    }
}());