var btnStart,
    btnCurrentSum,
    btnChoosenCup,
    btnGuessedCup,
    btnContinue,
    cups;

// test shuffling rows
// gameRenderer.renderCupsInUI(3);
// gameRenderer.shuffleCups();

// start game initial input data
btnStart = utils.getElement("#btn-start");
btnStart.addEventListener("click", engine.startGame);

// current game sum input data
btnCurrentSum = utils.getElement("#btn-current-sum");
btnCurrentSum.addEventListener("click", engine.getCurrentSum);

// choose cup
btnChoosenCup = utils.getElement("#btn-chosen-cup");
btnChoosenCup.addEventListener("click", engine.chooseCup);

// guess cup
btnGuessedCup = utils.getElement("#btn-guess-cup");
btnGuessedCup.addEventListener("click", engine.guessCup);

// continue game
btnContinue = utils.getElement("#btn-game-continue");
btnContinue.addEventListener("click", engine.continueGame);

// toggle cups
cups = document.getElementsByClassName("cups");

for (var i = 0; i < cups.length; i++) {
    cups[i].addEventListener("animationend", engine.moveCupUpAndDown);
    cups[i].addEventListener("animationend", engine.shuffleCupsArownd);
}
