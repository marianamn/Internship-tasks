/* exported memoryButtons */

var memoryButtons = (function () {
    function calculate(memory, btn, value) {
        var currentValue = parseFloat(value);
        var mc = document.querySelector(".mc");
        var mr = document.querySelector(".mr");

        switch (btn) {
            case "MC":
                memory = 0;
                mc.setAttribute("disabled", "disabled");
                mc.classList.add("disabled");

                mr.setAttribute("disabled", "disabled");
                mr.classList.add("disabled");
                break;
            case "MR":
                document.querySelector(".result").textContent = memory;
                document.querySelector(".screen").classList.add("hidden");

                return memory;
            case "M+":
                memory += currentValue;
                break;
            case "M-":
                memory -= currentValue;
                break;
            case "MS":
                memory = currentValue;

                mc.removeAttribute("disabled", "disabled");
                mc.classList.remove("disabled");

                mr.removeAttribute("disabled", "disabled");
                mr.classList.remove("disabled");
                break;
        }

        return memory;
    }

    return {
        calculate: calculate
    }
}());