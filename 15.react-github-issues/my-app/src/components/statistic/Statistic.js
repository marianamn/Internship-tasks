import React from "react";
import "./Statistic.css";

const Statistic = (props) => {
    return (
        <div>
            <h2>{props.repo.name}</h2>

            <div className="statistic">
                <div>
                    <p><strong>Watch: {props.repo.watch}</strong></p>
                    <p><strong>Star: {props.repo.stargazers_count}</strong></p>
                    <p><strong>Fork: {props.repo.forks_count}</strong></p>
                </div>

                <div>
                    <p><strong>Total issues: {props.repo.totalIssues}</strong></p>
                    <p><strong>Open: {props.repo.open_issues}</strong></p>
                    <p><strong>Closed: {props.repo.closed} </strong></p>
                </div>
            </div>
        </div>
    );
}

export default Statistic;