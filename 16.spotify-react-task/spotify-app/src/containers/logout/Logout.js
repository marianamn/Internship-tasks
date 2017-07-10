import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { isLoggedIn: true }
    }

    handleClick() {
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('user');
        localStorage.removeItem('country');

        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    <button onClick={this.handleClick}>Logout</button> :
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: this.props.location }
                    }} />
                }

            </div>
        );
    }
}

export default Logout;