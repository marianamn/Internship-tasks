var playerName = "",
    totalGameSum = 0,
    currentSum = 0,
    playerScore = 0,
    computerScore = 0,
    choosenGlass,
    guessedGlass,
    ballsPositions = [0, 0, 0],
    ballsPositionsRandomized,
    playAgain,
    btnStart,
    btnCurrentSum,
    btnChoosenGlass,
    btnGuessGlass,
    btnContinue;

// start game initial input data
btnStart = getElement("#btn-start");
btnStart.addEventListener("click", function(e) {
    e.preventDefault();

    playerName = getElement(".input-name").value;
    totalGameSum = Number(getElement(".input-total-sum").value);

    getElement(".step-initial-data").classList.add("hidden");
    getElement(".step-current-sum").classList.remove("hidden");

    console.log("playerName: " + playerName);
    console.log("totalGameSum: " + totalGameSum);
    console.log("computerScore: " + computerScore);
});

// current game sum
btnCurrentSum = getElement("#btn-current-sum");
btnCurrentSum.addEventListener("click", function(e) {
    e.preventDefault();

    currentSum = Number(getElement(".input-current-sum").value);

    getElement(".step-current-sum").classList.add("hidden");
    getElement(".step-shoose-glass").classList.remove("hidden");

    console.log("currentSum: " + currentSum);

    // print glasses
    printCupsInConsole("initial");
});

// choose glass
btnChoosenGlass = getElement("#btn-chosen-glass");
btnChoosenGlass.addEventListener("click", function(e) {
    e.preventDefault();
    var choosenGlassPosition;

    choosenGlass = getElement(".input-ball").value;
    choosenGlassPosition = choosenGlass - 1;
    ballsPositions[choosenGlassPosition] = 1;

    console.log("choosenGlass: " + choosenGlass);
    console.log("ballsPositions: " + ballsPositions);

    // randomize ballsPositions
    console.log("Shaking cups....")
    ballsPositionsRandomized = randomizeBallsPositions(ballsPositions);
    console.log(ballsPositionsRandomized);

    getElement(".step-shoose-glass").classList.add("hidden");
    getElement(".step-guess-glass").classList.remove("hidden");
});

// guess glass
btnGuessGlass = getElement("#btn-guess-glass");
btnGuessGlass.addEventListener("click", function(e) {
    e.preventDefault();
    var guessedGlassPosition,
        guessedBall;

    guessedGlass = getElement(".input-glass").value;
    guessedGlassPosition = guessedGlass - 1;
    guessedBall = ballsPositionsRandomized[guessedGlassPosition];

    if (guessedBall === 1) {
        playerScore += currentSum;
    } else {
        computerScore += currentSum;
    }

    totalGameSum -= currentSum;

    console.log("guessedGlass: " + guessedGlass);
    console.log("playerScore: " + playerScore);
    console.log("computerScore: " + computerScore);

    // print glasses with real numbers
    printCupsInConsole("result");

    getElement(".step-guess-glass").classList.add("hidden");
    getElement(".step-game-continue").classList.remove("hidden");
});

// continue game
btnContinue = getElement("#btn-game-continue");
btnContinue.addEventListener("click", function(e) {
    e.preventDefault();

    var winner;

    playAgain = getElement(".input-game-continue").value;
    getElement(".step-game-continue").classList.add("hidden");

    if (playAgain === "Yes" && totalGameSum > 0) {
        ballsPositions = [0, 0, 0];
        getElement("#user-input").reset();

        getElement(".step-current-sum").classList.remove("hidden");
    } else if (playAgain === "Yes" && totalGameSum <= 0) {
        var text = document.createElement("h2");

        text.textContent = "No available sum start the game from beginning!";
        getElement(".container").appendChild(text);

    } else if (playAgain === "No") {
        getElement(".game-over").classList.remove("hidden");
        getElement(".game-over").classList.remove("hidden");

        if (playerScore > computerScore) {
            getElement(".winner-name").textContent = "Winner: " + playerName;
            getElement(".winner-score").textContent = "Score: " + playerScore;
        } else {
            getElement(".winner-name").textContent = "Winner: Computer";
            getElement(".winner-score").textContent = "Score: " + computerScore;
        }
    }
});


// functions
function getElement(selector) {
    return document.querySelector(selector);
}

function randomizeBallsPositions(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

printCupsInConsole();

function printCupsInConsole(command) {
    printCupsTop();
    printCupsBodies();
    printCupsBottom();

    if (command === "result") {
        printResultLine();
    }

    printTable();
}

function printCupsTop() {
    var rows = 5,
        cols = 21,
        cups = [],
        space = " ",
        underscore = "_",
        left = "/",
        right = "\\",
        spaces = 8,
        output = '',
        cupSeparator = "            ";


    cups[0] = [];
    output += cupSeparator;
    for (var k = 0; k < 3; k++) {
        for (var j = 0; j < cols; j++) {
            if (j < spaces) {
                cups[0][j] = space;
            } else if (j < 13) {
                cups[0][j] = underscore;
            } else {
                cups[0][j] = space;
            }

            output += cups[0][j];
        }

        output += cupSeparator;
    }

    output += cupSeparator;
    console.log(output);
    output = '';
}

function printCupsBodies() {
    var rows = 5,
        cols = 21,
        cups = [],
        space = " ",
        underscore = "_",
        left = "/",
        right = "\\",
        spaces = 6,
        output = '',
        cupSeparator = "            ",
        mid = Math.floor(cols / 2);


    for (var i = 0; i < 3; i++) {
        cups[i] = [];
        output += cupSeparator;

        for (var k = 0; k < 3; k++) {
            for (var j = 0; j < cols; j++) {
                cups[i][j] = space;
                if (j === spaces) {
                    cups[i][j] = left;
                } else if (j === (cols - spaces - 1)) {
                    cups[i][j] = right;
                } else if (i === 1 && j === mid) {
                    cups[i][j] = k + 1;
                } else {
                    cups[i][j] = space;
                }

                output += cups[i][j];
            }

            output += cupSeparator;
        }

        output += cupSeparator;
        spaces -= 2;
        console.log(output);
        output = '';
    }
}

function printCupsBottom() {
    var rows = 5,
        cols = 21,
        cups = [],
        space = " ",
        underscore = "_",
        left = "/",
        right = "\\",
        output = '',
        cupSeparator = "            ";

    cups[0] = [];
    output += cupSeparator;
    for (var k = 0; k < 3; k++) {
        cups[0][j - 1] = left;
        output += cups[0][j - 1];

        for (var j = 1; j < cols - 1; j++) {
            cups[0][j] = underscore;
            output += cups[0][j];
        }

        cups[0][cols - 1] = right;
        output += cups[0][cols - 1];
        output += cupSeparator;
    }

    console.log(output);
    output = '';
}

function printTable() {
    var underscore = "_",
        output = "";

    for (var i = 0; i < (21 * 3 + 12 * 4); i++) {
        output += underscore;
    }

    console.log(output);
}

function printResultLine() {

}