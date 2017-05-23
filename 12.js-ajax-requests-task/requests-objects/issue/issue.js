let Issue = (function () {
    class IssueClass {
        constructor(title, state, number, createdAt, closedAt, user, comments) {
            this.title = title;
            this.state = state;
            this.number = number;
            this.createdAt = createdAt;
            this.closedAt = closedAt;
            this.user = user;
            this.comments = comments;
        }
    }

    return IssueClass;
}());