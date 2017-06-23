import React, { Component } from 'react';
import './Login';

import { spotify_client_id } from '../../common/constants';
import { urls } from '../../common/constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.handleSpotifyConnect();
    }

    handleSpotifyConnect() {
        let authURL =
            urls.spotify_auth_url + "?client_id=" +
            spotify_client_id + "&redirect_uri=" +
            encodeURIComponent(urls.spotify_redirection_url) + "" +
            "&response_type=token"

        let width = 450,
            height = 730,
            left = (document.innerWidth / 2) - (width / 2),
            top = (document.innerHeight / 2) - (height / 2);

        window.open(
            authURL,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    }

    render() {
        return (
            <div className="component-container login-panel">
                <button onClick={this.handleClick}>Login</button>
            </div>
        );
    }
}

export default Login;