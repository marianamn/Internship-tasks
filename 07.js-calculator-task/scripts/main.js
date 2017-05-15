/*global  menu calculations*/

var btnOpenToggle,
    btnCloseToggle,
    keys = [],
    elementsList;

function initializeElements() {
    return {
        btnOpenToggle: document.querySelector(".toggle"),
        btnCloseToggle: document.querySelector(".close-toggle"),
        keys: document.querySelectorAll("#calculator button")
    }
}

elementsList = initializeElements();

// sub menu options
btnOpenToggle = elementsList.btnOpenToggle;
btnOpenToggle.addEventListener("click", menu.openSubMenu);
btnCloseToggle = elementsList.btnCloseToggle;
btnCloseToggle.addEventListener("click", menu.closeSubMenu);

// keys add events
keys = elementsList.keys;

for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", calculations.calculate);
}