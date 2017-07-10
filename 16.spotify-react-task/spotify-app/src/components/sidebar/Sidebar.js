import React from 'react';
import { Link } from 'react-router-dom';
//import {spotifyIcon } from '../../assets/spotify-icon.png';

import './Sidebar.css';

const Sidebar = (props) => (
    <aside className='sidebar'>
        <ul>
            <li><Link to='/browse/featured'><img className='logo-icon' src='https://assets.ifttt.com/images/channels/51464135/icons/monochrome_large.png' alt='' /></Link></li>
            <li><Link className='search' to='/search/artists'>Search<i className='fa fa-search search-icon' aria-hidden='true'></i></Link></li>
            <li><Link className='browse' to='/browse/featured'>Browse</Link></li>
            <li><Link className='your-music' to='/collection/playlists'>Your Music</Link></li>
            <li><Link to='/settings/account'><img className='user-icon' src='http://webmii.com/images/user%20white.png' alt='' />
                {props.user}
            </Link></li>
        </ul>
    </aside>
)

export default Sidebar;