import React, { Component } from 'react';

import { urls } from '../../common/constants';

class Callback extends Component {
    constructor(props) {
        super(props);
        this.token = '';
    }

    componentDidMount() {
        let result = this.props.location.hash
            .replace(/^#\/?/, '')
            .split('&');

        let tokenString = result[0];
        let splitByIndex = tokenString.indexOf('=');

        this.token = decodeURIComponent(tokenString.substring(splitByIndex + 1));
        localStorage.setItem('spotify_token', this.token)

        this.getUserDetails();
    }

    getUserDetails() {
        var headers = {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        }

        return fetch(urls.user_details_url, headers)
            .then(response => response.json())
            .then(function (result) {
                console.log(result);

                localStorage.setItem('user', result.id);
            })
            .catch(error => error);
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Callback;
