let Renderer = (function () {
    class RendererClass {
        constructor(issues) {
            this.issues = issues;
        }

        createElement(element) {
            return document.createElement(element);
        }

        getPasedTimeAfterDate(dateAsString) {
            let date,
                hours,
                messegeResult,
                utils = new Utils();

            date = new Date(dateAsString);
            hours = Math.floor(Math.abs(new Date() - date) / 36e5);
            //console.log(hours);

            messegeResult = utils.getFormattedDate(date, hours);

            return messegeResult;
        }

        render() {
            let fragment = document.createDocumentFragment();

            this.issues.forEach((issue) => {
                let container = this.createElement("div"),
                    title = this.createElement("p"),
                    comments = this.createElement("p"),
                    moreDetails = this.createElement("p"),
                    passedTime = new Date(issue.createdAt),
                    passedTimeResult,
                    state;

                container.classList.add('container');
                title.classList.add('title');
                comments.classList.add('comments-count');
                moreDetails.classList.add('detailes');

                if (issue.state === 'open') {
                    state = 'opened';
                    passedTimeResult = this.getPasedTimeAfterDate(issue.createdAt);
                } else {
                    state = 'closed';
                    passedTimeResult = this.getPasedTimeAfterDate(issue.closedAt);
                }

                title.textContent = issue.title;
                comments.textContent = issue.comments;
                moreDetails.textContent = `#${issue.number} ${state} ${passedTimeResult} by ${issue.user}`;

                container.appendChild(title);
                container.appendChild(comments);
                container.appendChild(moreDetails);

                fragment.appendChild(container);
            })

            document.querySelector('#wrapper').appendChild(fragment);
        }
    }

    return RendererClass;
}());