var engine = (function () {
    var playerName = "",
        totalPlayerSum = 0,
        currentGameSum = 0,
        totalOpponentSum = 0,
        numberOfCups = 3,
        choosenCup,
        guessedCup,
        ballPosition,
        playAgain;

    function initialize() {
        return {
            playerName: utils.getElement(".input-name"),
            totalPlayerSum: utils.getElement(".input-total-sum"),
            formInitialPlayerData: utils.getElement(".step-initial-data"),
            formCurrentSum: utils.getElement(".step-current-sum"),
            inputCurrentSum: utils.getElement(".input-current-sum"),
            formChooseCup: utils.getElement(".step-shoose-cup"),
            inputChoosenCup: utils.getElement(".input-ball"),
            formGuessCup: utils.getElement(".step-guess-cup"),
            inputGuessedCup: utils.getElement(".input-cup"),
            inputGameContinue: utils.getElement(".input-game-continue"),
            formGameContinue: utils.getElement(".step-game-continue"),
            gameUiRender: utils.getElement(".game-ui"),
            formUserInput: utils.getElement(".user-input"),
            mainContainer: utils.getElement("#container"),
            gameOverContainer: utils.getElement(".game-over"),
            gameHeading: utils.getElement(".game-heading"),
            winnerName: utils.getElement(".winner-name"),
            winnerScore: utils.getElement(".winner-score"),
            opponentScore: utils.getElement(".opponent-score")
        }

    }

    var elementsList = initialize();

    function startGame(e) {
        e.preventDefault();

        playerName = elementsList.playerName.value;
        totalPlayerSum = parseInt(elementsList.totalPlayerSum.value);
        totalOpponentSum = totalPlayerSum;

        elementsList.formInitialPlayerData.classList.add("hidden");
        elementsList.formCurrentSum.classList.remove("hidden");
    }

    function getCurrentSum(e) {
        e.preventDefault();

        currentGameSum = parseInt(elementsList.inputCurrentSum.value);

        elementsList.formCurrentSum.classList.add("hidden");
        elementsList.formChooseCup.classList.remove("hidden");

        // print cups
        gameRenderer.printCupsInConsole("initial", ballPosition, numberOfCups);
        gameRenderer.renderCupsInUI(numberOfCups);
    }

    function chooseCup(e) {
        e.preventDefault();

        choosenCup = parseInt(elementsList.inputChoosenCup.value);

        console.log(playerName + " put the ball under cup: " + choosenCup);
        gameRenderer.showBallUnderCup(choosenCup);

        // randomize balls
        ballPosition = utils.getRandomInt(1, 3);
        console.log("Shaking cups....");
        gameRenderer.shuffleCups();

        elementsList.formChooseCup.classList.add("hidden");
        elementsList.formGuessCup.classList.remove("hidden");
    }

    function guessCup(e) {
        e.preventDefault();

        guessedCup = parseInt(elementsList.inputGuessedCup).value;

        if (guessedCup === ballPosition) {
            totalPlayerSum += currentGameSum;
            totalOpponentSum -= currentGameSum;
        } else {
            totalOpponentSum += currentGameSum;
            totalPlayerSum -= currentGameSum;
        }

        elementsList.formGuessCup.classList.add("hidden");
        elementsList.formGameContinue.classList.remove("hidden");

        console.log("guessedCup: " + guessedCup);
        gameRenderer.printCupsInConsole("result", ballPosition, numberOfCups);
        gameRenderer.showBallUnderCup(ballPosition);
    }

    function continueGame(e) {
        e.preventDefault();

        playAgain = elementsList.inputGameContinue.value;
        elementsList.formGameContinue.classList.add("hidden");

        if (playAgain === "Yes") {
            elementsList.gameUiRender.classList.add("hidden");
            elementsList.formUserInput.reset();

            elementsList.formCurrentSum.classList.remove("hidden");
        } else if (playAgain === "No") {
            elementsList.gameOverContainer.classList.remove("hidden");
            elementsList.gameHeading.classList.add("hidden");
            elementsList.formUserInput.classList.add("hidden");
            elementsList.mainContainer.style.background = "#4192AF";
            elementsList.mainContainer.style.opacity = ".8";
            elementsList.gameUiRender.classList.add("hidden");

            if (totalPlayerSum > totalOpponentSum) {
                elementsList.winnerName.textContent = "Winner: " + playerName.toUpperCase();
                elementsList.winnerScore.textContent = playerName.toUpperCase() + " score: " + totalPlayerSum;
                elementsList.opponentScore.textContent = "Opponent score: " + totalOpponentSum;
            } else if (totalPlayerSum < totalOpponentSum) {
                elementsList.winnerName.textContent = "Winner: " + "Opponent".toUpperCase();
                elementsList.winnerScore.textContent = "Opponent score: " + totalOpponentSum;
                elementsList.opponentScore.textContent = playerName + " score: " + totalPlayerSum;
            } else {
                elementsList.winnerName.textContent = "Game ends equal!".toUpperCase();
                elementsList.winnerScore.textContent = "Opponent score: " + totalOpponentSum;
                elementsList.opponentScore.textContent = playerName + " score: " + totalPlayerSum;
            }
        }
    }

    function moveCupUpAndDown() {
        var currentCup = document.getElementsByClassName("current")[0];

        this.classList.remove("animate-cups");
        if (currentCup) {
            currentCup.classList.add("hidden");
            currentCup.classList.remove("current");
        }
    }

    function shuffleCupsArownd() {
        var cups = document.getElementsByClassName("cups");

        for (var i = 0; i < cups.length; i++) {
            cups[i].className = "cups";
        }
    }

    return {
        startGame: startGame,
        getCurrentSum: getCurrentSum,
        chooseCup: chooseCup,
        guessCup: guessCup,
        continueGame: continueGame,
        moveCupUpAndDown: moveCupUpAndDown,
        shuffleCupsArownd: shuffleCupsArownd
    }
}());