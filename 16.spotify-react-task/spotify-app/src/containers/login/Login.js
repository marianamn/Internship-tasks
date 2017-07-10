import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

import { spotify_client_id, urls } from '../../common/constants';
import { connect } from 'react-redux';
import { userFetchData } from '../../actions/user';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: false };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.loginSuccess = () => {
            this.setState({ isLogged: true });
        };
    }

    handleClick() {
        this.handleSpotifyConnect();
    }

    handleSpotifyConnect() {
        let authURL =
            urls.spotify_auth_url + '?client_id=' +
            spotify_client_id + '&redirect_uri=' +
            encodeURIComponent(urls.spotify_redirection_url) + '' +
            '&response_type=token&scope=user-library-read user-follow-read'

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
            <div className='component-container'>

                {this.state.isLogged ?
                    <Redirect to={{
                        pathname: '/browse/featured',
                        state: { from: this.props.location }
                    }} /> :
                    <div className='login-panel'>
                        <div>
                            <p><img src='https://assets.ifttt.com/images/channels/51464135/icons/monochrome_large.png' alt='' /><span>Spotify</span></p>
                            <button onClick={this.handleClick}>Login</button>
                        </div>

                        <div className='welcome-panel'>
                            <p>Get the right music,</p>
                            <p>right now</p>
                            <p>Listen millions of songs for free</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        userFetch: (token) => dispatch(userFetchData(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
