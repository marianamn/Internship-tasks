var utils = (function () {
    function getElement(selector) {
        return document.querySelector(selector);
    }

    function createElement(element) {
        return document.createElement(element);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function repeatString(string, num) {
        var result = "";

        for (var i = 0; i < num; i++) {
            result += string;
        }

        return result;
    }

    return {
        getElement: getElement,
        createElement: createElement,
        getRandomInt: getRandomInt,
        repeatString: repeatString
    }
}());