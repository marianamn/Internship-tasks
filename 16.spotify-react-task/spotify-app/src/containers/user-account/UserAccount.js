import React, { Component } from 'react';
import './UserAccount.css';
import Logout from '../../containers/logout/Logout';

class UserAccount extends Component {
    render() {
        return (
            <div className='component-container user-panel'>
                <img className='user-image' src='http://webmii.com/images/user%20white.png' alt='' />
                <Logout></Logout>
            </div>
        );
    }
}

export default UserAccount;