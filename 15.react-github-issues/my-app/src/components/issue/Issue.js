import React from "react";
import "./Issue.css";
import getTimeDifference from '../../services/format-date-service';

function getFormattedDate(date) {
    return getTimeDifference(date);
}

const Issue = (props) => {
    let formattedDate = getFormattedDate(props.issue.created_at);

    return (
        <div className="github-issue">
            <p className="title">{props.issue.title}</p>
            <p className="comments-count">{props.issue.comments}</p>
            <p className="details">
                #{props.issue.number} {props.issue.state} by {props.issue.user.login}
            </p>
            <p>{formattedDate}</p>
        </div>
    );
}

export default Issue;