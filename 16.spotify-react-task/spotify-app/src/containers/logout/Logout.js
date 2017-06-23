import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('user');
    }

    render() {
        return (
            <button onClick={this.handleClick}>Logout</button>
        );
    }
}

export default Logout;