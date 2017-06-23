import React from "react";
import "./IssuesList.css";
import Issue from "../issue/Issue";

const IssuesList = (props) => {
    const listOfIssues = props.issues.map((issue) =>
        <li key={issue.number.toString()}>
            <Issue issue={issue}></Issue>
        </li>
    );

    return (
        <div onScroll={props.onScroll}>
            <ul>{listOfIssues}</ul>
        </div>
    );
}

export default IssuesList;