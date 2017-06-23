import React from "react";

const Sort = (props) => {
    return (
        <div>
            <label>Sort by:</label>
            <select onChange={props.onChange}>
                <option value=""></option>
                <option value="comments desc">Most commented</option>
                <option value="comments asc">Least commented</option>
                <option value="updated desc">Recently updated</option>
                <option value="updated asc">Least recently updated</option>
            </select>

        </div>
    );
}

export default Sort;