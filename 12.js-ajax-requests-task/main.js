let authID = '4baf5db08718ca02f3d8',
    authSecret = '9b6cae2642a5a9887a22e2cbdc8db141458773e8',
    page = 0,
    reactIssuesUrl,
    requester = new Requester();

const itemsPerPage = 25;

window.addEventListener('load', initialData);
window.addEventListener('scroll', getRequestsData);

function initialData(e) {
    e.preventDefault();

    getData();
}

function getRequestsData(e) {
    e.preventDefault();

    // console.log('doc' + (getDocHeight() - 50))
    // console.log('scr' + getScrollXY()[1])
    // console.log('w' + window.innerHeight)

    // if ((getDocHeight() - 20 - window.innerHeight) <= getScrollXY()) {
    //     getData(2, 25);
    //     console.log(page)
    // }

    if (document.body.scrollTop + window.innerHeight >= getDocHeight()) {
        getData();
        console.log(page)
    }
    // console.log(document.body.offsetHeight - window.innerHeight)
    // console.log(document.body.scrollTop);
    // if ((document.body.offsetHeight - window.innerHeight) === document.body.scrollTop) {
    //     getData();
    // }
}

function getData() {
    issues = [];
    page++;

    let url = `https://api.github.com/repos/facebook/react/issues?state=all&page=${page}&per_page=${itemsPerPage}&client_id=${authID}&client_secret=${authSecret}`;

    requester.get(url)
        .then(data => {
            data.forEach((item) => {
                let title = item.title,
                    state = item.state,
                    number = item.number,
                    createdAt = item.created_at,
                    closedAt = item.closed_at,
                    user = item.user.login,
                    comments = item.comments;

                let issue = new Issue(title, state, number, createdAt, closedAt, user, comments);

                issues.push(issue);
                //console.log(item.number);
            });

            return issues;
        })
        .then(items => {
            //console.log(items);
            let renderer = new Renderer(items);
            renderer.render();
        })
        .catch(error => {
            console.log(error);
        })
}

function getScrollXY() {
    var scrOfY = 0;

    if (typeof(window.pageYOffset) === 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
    }

    return scrOfY;
}

function getDocHeight() {
    var D = document;

    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}