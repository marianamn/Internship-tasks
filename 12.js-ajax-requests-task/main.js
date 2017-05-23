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

    console.log(document.body.offsetHeight - window.innerHeight)
    console.log(document.body.scrollTop);
    if ((document.body.offsetHeight - window.innerHeight) === document.body.scrollTop) {
        getData();
    }
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
                console.log(item.number);
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