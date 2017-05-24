function getScrollXY() {
    var scrOfX = 0,
        scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
let counter = 1;

document.addEventListener("scroll", function(event) {
    if (getDocHeight() - 20 <= getScrollXY()[1] + window.innerHeight) {
        var oldcontent = document.getElementById('main');
        oldcontent.innerHTML = oldcontent.innerHTML + '<div class="page">new content loaded</div>';
        document.getElementById("main").innerHTML = oldcontent.innerHTML;
        console.log(counter);
        counter++;

    }
});