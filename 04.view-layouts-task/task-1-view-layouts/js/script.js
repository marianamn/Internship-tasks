var views = document.querySelectorAll("#container .view");

var currentView = views[0];
currentView.classList.add("current");

function clickedNavigationLink(clickedLink, activeViewNumber) {
    clickedLink.addEventListener("click", function() {
        currentView.classList.remove("current");

        currentView = views[activeViewNumber];
        currentView.classList.add("current");
    });
}

var firstLink = document.getElementsByClassName("first-link")[0];
var secondLink = document.getElementsByClassName("second-link")[0];
var thirdLink = document.getElementsByClassName("third-link")[0];

clickedNavigationLink(firstLink, 0);
clickedNavigationLink(secondLink, 1);
clickedNavigationLink(thirdLink, 2);