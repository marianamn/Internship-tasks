var views = document.querySelectorAll("#container .view"),
    nav = document.getElementById("navigation");

nav.addEventListener("click", changeView);

function changeView(e) {
    var currentIndex,
        nextIndex,
        listItems,
        currentView,
        nextView;

    e.preventDefault();

    if (e.target.nodeName.toLowerCase() === 'a') {
        listItems = nav.querySelectorAll('li');
        currentIndex = findActiveItemIndex(listItems);

        // remove active class from current slide
        nav.querySelector('.js-active').classList.remove('js-active');

        // mark which is the next slide
        e.target.classList.add('js-active');
        nextIndex = findActiveItemIndex(listItems);

        currentView = views[currentIndex];
        nextView = views[nextIndex];

        if (currentIndex > nextIndex) {
            currentView.className = 'view center-to-right';
            nextView.className = 'view left-to-right js-active';
        } else if (currentIndex < nextIndex) {
            currentView.className = 'view center-to-left';
            nextView.className = 'view right-to-left js-active';
        }
    }
}

function findActiveItemIndex(elems) {
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].querySelector('.js-active')) {
            return i;
        }
    }
}