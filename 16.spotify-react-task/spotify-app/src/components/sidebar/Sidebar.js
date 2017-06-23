import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const userName = localStorage.getItem('user');

const Sidebar = (props) => (
    <aside className="sidebar">
        <ul>
            <li><Link to='/'>Login</Link></li>
            <li><Link to='/browse/featured'><img src="https://assets.ifttt.com/images/channels/51464135/icons/monochrome_large.png" alt="" width="30" height="30"/></Link></li>
            <li><Link to='/search/recent'>Search<i className="fa fa-search search-icon" aria-hidden="true"></i></Link></li>
            <li><Link to='/browse/featured'>Browse</Link></li>
            <li><Link to='/collection/playlists'>Your Music</Link></li>
            <li><Link to='/settings/account'><img className="user-icon" src="http://webmii.com/images/user%20white.png"alt="" width="30" height="30"/>{userName}</Link></li>
        </ul>
    </aside>
)

export default Sidebar;