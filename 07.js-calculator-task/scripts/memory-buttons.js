var memoryButtons = (function () {
    function calculate(btn, value) {
        var memory = 0,
            currentValue = parseFloat(value);
        console.log(currentValue);

        switch (btn) {
            case "MC": memory = 0;
                break;
            case "MR":  return memory; 
                break;
            case "M+":  memory += currentValue;
                break;
            case "M-":  memory -= currentValue;
                break;
            case "MS":  memory = currentValue;
                break;
        }

        return memory;
    };

    return {
        calculate: calculate
    }
}());