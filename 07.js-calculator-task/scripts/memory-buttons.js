var memoryButtons = (function() {
    function calculate(memory, btn, value) {
        var currentValue = parseFloat(value);

        switch (btn) {
            case "MC":
                memory = 0;
                break;
            case "MR":
                return memory;
            case "M+":
                memory += currentValue;
                break;
            case "M-":
                memory -= currentValue;
                break;
            case "MS":
                memory = currentValue;
                break;
        }

        return memory;
    }

    return {
        calculate: calculate
    }
}(memoryButtons));