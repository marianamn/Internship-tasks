var gameEngine = (function () {
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
            homeScreen: utils.getElement(".lets-play"),
            scorePanel: utils.getElement(".score-panel"),
            playerName: utils.getElement(".input-name"),
            playerNameUI: utils.getElement(".player-name"),
            playerScoreUI: utils.getElement(".player-score"),
            computerScoreUI: utils.getElement(".computer-score"),
            currentBetUI: utils.getElement(".current-bet"),
            bet: utils.getElement(".bet"),
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
            opponentScore: utils.getElement(".opponent-score"),
            showGuessInfo: utils.getElement(".show-the-guess-info")
        }

    }

    var elementsList = initialize();

    function startGame(e) {
        e.preventDefault();

        playerName = elementsList.playerName.value;
        totalPlayerSum = parseInt(elementsList.totalPlayerSum.value);
        totalOpponentSum = totalPlayerSum;

        elementsList.playerNameUI.textContent = playerName;
        elementsList.playerScoreUI.textContent = totalPlayerSum;
        elementsList.computerScoreUI.textContent = totalOpponentSum;

        elementsList.formInitialPlayerData.classList.add("hidden");
        elementsList.homeScreen.classList.add("hidden");
        elementsList.scorePanel.classList.remove("hidden");
        elementsList.formCurrentSum.classList.remove("hidden");
    }

    function getCurrentSum(e) {
        e.preventDefault();

        currentGameSum = parseInt(elementsList.inputCurrentSum.value);

        if(currentGameSum < currentGameSum){
            currentGameSum = currentGameSum;

        }

        elementsList.currentBetUI.textContent = currentGameSum;

        elementsList.formCurrentSum.classList.add("hidden");
        elementsList.bet.classList.remove("hidden");
        elementsList.formChooseCup.classList.remove("hidden");

        // print cups
        gameRenderer.printCupsInConsole("initial", ballPosition, numberOfCups);
        gameRenderer.renderCupsInUI(numberOfCups);
    }

    function chooseCup(e) {
        e.preventDefault();

        choosenCup = parseInt(elementsList.inputChoosenCup.value);
        // choosenCup = parseInt(e.target.parentNode.getAttribute("value"));

        console.log(playerName + " put the ball under cup: " + choosenCup);
        gameRenderer.showBallUnderCup(choosenCup);

        // randomize balls
        ballPosition = utils.getRandomInt(1, 3);
        console.log("Shaking cups....");
        gameRenderer.shuffleCups(choosenCup);
        console.log(ballPosition);

        elementsList.formChooseCup.classList.add("hidden");
        elementsList.formGuessCup.classList.remove("hidden");
    }

    function guessCup(e) {
        e.preventDefault();

        guessedCup = parseInt(elementsList.inputGuessedCup.value);

        if (guessedCup === ballPosition) {
            totalPlayerSum += currentGameSum;
            totalOpponentSum -= currentGameSum;
        } else {
            totalOpponentSum += currentGameSum;
            totalPlayerSum -= currentGameSum;
        }

        elementsList.playerScoreUI.textContent = totalPlayerSum;
        elementsList.computerScoreUI.textContent = totalOpponentSum;

        elementsList.formGuessCup.classList.add("hidden");
        elementsList.formGameContinue.classList.remove("hidden");

        console.log("guessedCup: " + guessedCup);
        gameRenderer.printCupsInConsole("result", ballPosition, numberOfCups);

        elementsList.showGuessInfo.classList.remove("hidden");
        if (guessedCup === ballPosition) {
            elementsList.showGuessInfo.textContent = "CORRECT GUESS!";
            elementsList.showGuessInfo.classList.add("correct");
            gameRenderer.showBallUnderCup(ballPosition);
        } else {
            elementsList.showGuessInfo.textContent = "WRONG GUESS!";
            elementsList.showGuessInfo.classList.add("wrong");
            gameRenderer.moveEmptyCup(guessedCup);
        }
    }

    function continueGame(e) {
        e.preventDefault();

        var winner,
            winnerScore,
            opponentScore;

        playAgain = elementsList.inputGameContinue.value;
        elementsList.formGameContinue.classList.add("hidden");
        elementsList.showGuessInfo.classList.add("hidden");
        elementsList.bet.classList.add("hidden");
        elementsList.gameUiRender.classList.add("hidden");

        if (playAgain === "Yes") {
            elementsList.formUserInput.reset();
            elementsList.currentBetUI.textContent = 0;

            elementsList.formCurrentSum.classList.remove("hidden");
        } else if (playAgain === "No") {
            elementsList.gameOverContainer.classList.remove("hidden");
            elementsList.formUserInput.classList.add("hidden");

            if (totalPlayerSum > totalOpponentSum) {
                winner = "Winner: " + playerName.toUpperCase();
            } else if (totalPlayerSum < totalOpponentSum) {
                winner = "Winner: " + "Computer";
            } else {
                winner = "Game ends equal!";
            }

            elementsList.winnerName.textContent = winner;
        }
    }

    function moveCupUpAndDown() {
        var currentCup = document.getElementsByClassName("current")[0];

        this.classList.remove("animate-cups");
        if (currentCup) {
            currentCup.classList.remove("current");
            currentCup.classList.add("hidden");
        }
    }

    function shuffleCupsAround() {
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
        shuffleCupsAround: shuffleCupsAround
    }
}());