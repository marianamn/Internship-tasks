import React from 'react';

const Selector = (props) => {
    const listOfRepos = props.repos.map((repo) =>
        <option key={repo.name.toString()} value={repo.full_name}>
            {repo.name}
        </option>
    );

    return (
        <select onChange={props.onChange}>
            {listOfRepos}
        </select>
    );
}

export default Selector;