import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const HeaderPlaylist = () => (
    <nav>
        <ul>
            <li><Link to='/collection/playlists'>Playlists</Link></li>
            <li><Link to='/collection/albums'>Albums </Link></li>
            <li><Link to='/collection/artists'>Artists</Link></li>
        </ul>
    </nav>
)

export default HeaderPlaylist;