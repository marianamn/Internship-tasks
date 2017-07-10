import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderPlaylist.css';

const HeaderPlaylist = () => (
    <nav className='navigation'>
        <ul>
            <li><Link to='/collection/playlists'>Playlists<p></p></Link></li>
            <li><Link to='/collection/albums'>Albums<p></p></Link></li>
            <li><Link to='/collection/artists'>Artists<p></p></Link></li>
        </ul>
    </nav>
)

export default HeaderPlaylist;