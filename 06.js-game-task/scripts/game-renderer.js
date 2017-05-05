
var gameRenderer = (function () {
    function printCupsInConsole(command, ballPosition, numberOfCups) {
        var rows = 5,
            cols = 11, // always min (rows*2 - 1) and to be odd
            cupsSeparatorSpaces = rows - 1,
            symbols = {
                space: " ",
                underscore: "_",
                left: "/",
                right: "\\",
                star: "*",
                cupSeparator: utils.repeatString(" ", cupsSeparatorSpaces),
            }

        printCupsTop(cols, numberOfCups, symbols, cupsSeparatorSpaces);
        printCupsBodies(cols, rows, numberOfCups, symbols, cupsSeparatorSpaces);
        printCupsBottom(cols, numberOfCups, symbols);

        if (command === "result") {
            printResultLine(cols, numberOfCups, symbols, ballPosition);
        }

        printTable(cols, numberOfCups, symbols);
    }

    function printCupsTop(cols, numberOfCups, symbols, cupsSeparatorSpaces) {
        var output = '';

        output += symbols.cupSeparator;

        for (var k = 0; k < numberOfCups; k++) {
            for (var j = 0; j < cols; j++) {
                if (j < cupsSeparatorSpaces) {
                    output += symbols.space;
                } else if (j < (cols - cupsSeparatorSpaces)) {
                    output += symbols.underscore;
                } else {
                    output += symbols.space;
                }
            }

            output += symbols.cupSeparator;
        }

        output += symbols.cupSeparator;
        console.log(output);
        output = '';
    }

    function printCupsBodies(cols, rows, numberOfCups, symbols, cupsSeparatorSpaces) {
        var cups = [],
            spaces = cupsSeparatorSpaces - 1,
            output = '',
            midCols = Math.floor(cols / 2),
            midRows = Math.floor(rows / 2);

        for (var i = 0; i < (rows - 2); i++) {
            cups[i] = [];
            output += symbols.cupSeparator;

            for (var k = 0; k < numberOfCups; k++) {
                for (var j = 0; j < cols; j++) {
                    if (j === spaces) {
                        cups[i][j] = symbols.left;
                    } else if (j === (cols - spaces - 1)) {
                        cups[i][j] = symbols.right;
                    } else if (i === (midRows - 1) && j === midCols) {
                        cups[i][j] = k + 1;
                    } else {
                        cups[i][j] = symbols.space;
                    }

                    output += cups[i][j];
                }

                output += symbols.cupSeparator;
            }

            output += symbols.cupSeparator;
            spaces -= 1;
            console.log(output);
            output = '';
        }
    }

    function printCupsBottom(cols, numberOfCups, symbols) {
        var output = '';

        output += symbols.cupSeparator;

        for (var k = 0; k < numberOfCups; k++) {
            output += symbols.left;

            for (var j = 1; j < cols - 1; j++) {
                output += symbols.underscore;
            }

            output += symbols.right;
            output += symbols.cupSeparator;
        }

        console.log(output);
        output = '';
    }

    function printTable(cols, numberOfCups, symbols) {
        var output = "",
            spacesBetweenCups = symbols.cupSeparator.length,
            tableLenght = numberOfCups * cols + (numberOfCups + 1) * spacesBetweenCups;

        for (var i = 0; i < tableLenght; i++) {
            output += symbols.star;
        }

        console.log(output);
    }

    function printResultLine(cols, numberOfCups, symbols, ballPosition) {
        var output = "",
            space = utils.repeatString(" ", Math.floor((cols - 1) / 2));

        output += symbols.cupSeparator;
        for (var i = 0; i < numberOfCups; i++) {
            if ((ballPosition - 1) === i) {
                output += space + "@" + space;
            } else {
                output += space + "X" + space;
            }

            output += symbols.cupSeparator;
        }

        console.log(output);
    }

    function renderCupsInUI(numberOfCups) {
        utils.getElement(".game-ui").classList.remove("hidden");
        utils.getElement(".ball-list").classList.add("hidden");
    }

    function showBallUnderCup(cup) {
        var currentBall = getCurrenBall(cup);

        currentBall.classList.remove("hidden");
        currentBall.classList.add("current");
        document.getElementsByClassName("cups")[cup - 1].classList.add("animate-cups");
    }

    function getCurrenBall(cup) {
        var balls = document.querySelectorAll("[data-id]");

        for (var i = 0; i < balls.length; i++) {
            if (parseInt(balls[i].getAttribute("data-id")) === cup) {
                return balls[i];
            }
        }
    }

    function shuffleCups() {
        var cups = document.getElementsByClassName("cups"),
            repeatTimes = 10;

        function moveCups() {
            var randomFirstMovedCup = utils.getRandomInt(1, 3),
                randomSecondMovedCup = utils.getRandomInt(1, 2); 

            if (randomFirstMovedCup === 3) {
                if (randomSecondMovedCup === 1) {
                    cups[randomFirstMovedCup - 1].classList.add("left");
                    cups[randomSecondMovedCup - 1].classList.add("right");
                } else {
                    cups[randomFirstMovedCup - 1].classList.add("middle-left");
                    cups[randomSecondMovedCup - 1].classList.add("middle-right");
                }
            } else if (randomFirstMovedCup === 2) {
                if (randomSecondMovedCup === 1) {
                    cups[randomFirstMovedCup - 1].classList.add("middle-left");
                    cups[randomSecondMovedCup - 1].classList.add("middle-right");
                } else {
                    cups[randomFirstMovedCup - 1].classList.add("middle-right");
                    cups[randomSecondMovedCup].classList.add("middle-left");
                }
            } else {
                if (randomSecondMovedCup === 1) {
                    cups[randomFirstMovedCup - 1].classList.add("middle-right");
                    cups[randomSecondMovedCup].classList.add("middle-left");
                } else {
                    cups[randomFirstMovedCup - 1].classList.add("right");
                    cups[randomSecondMovedCup].classList.add("left");
                }
            }
        }

        for (var i = 1; i < repeatTimes; i++) {
            setTimeout(moveCups, 1000 * i);
        }
    }

    return {
        // console
        printCupsInConsole: printCupsInConsole,

        // UI
        renderCupsInUI: renderCupsInUI,
        showBallUnderCup: showBallUnderCup,
        shuffleCups: shuffleCups
    }
}());