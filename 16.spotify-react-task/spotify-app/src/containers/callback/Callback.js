import React, { Component } from 'react';
import { getCurrentUserDetails } from '../../services/getUserData';

class Callback extends Component {
    componentDidMount() {
        let result = this.props.location.hash
            .replace(/^#\/?/, '')
            .split('&');

        let token = '';

        let tokenString = result[0];
        let splitByIndex = tokenString.indexOf('=');

        token = decodeURIComponent(tokenString.substring(splitByIndex + 1));
        localStorage.setItem('spotify_token', token);

        getCurrentUserDetails(token)
            .then(result => {
                localStorage.setItem('user', result.id);
                localStorage.setItem('country', result.country);

                window.opener.loginSuccess();
                window.close();
            })
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Callback;
