import React, { Component } from 'react';

import Logout from '../../containers/logout/Logout';

class UserAccount extends Component {
    render() {
        return (
            <div className="component-container">
                UserAccount page
                <Logout></Logout>
            </div>
        );
    }
}

export default UserAccount;