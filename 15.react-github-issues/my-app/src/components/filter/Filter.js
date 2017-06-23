import React from "react";

const Filter = (props) => {
    return (
        <div>
            <label>Filter by:</label>
            <select onChange={props.onChange}>
                <option value="">All</option>
                <option value="open">Opened</option>
                <option value="closed">Closed</option>
            </select>
        </div>
    );
}

export default Filter;