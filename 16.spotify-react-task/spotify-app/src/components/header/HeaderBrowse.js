import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const HeaderBrowse = () => (
    <nav>
        <ul>
            <li><Link to='/browse/featured'>Featured</Link></li>
            <li><Link to='/browse/genres'>Genres & Moods</Link></li>
            <li><Link to='/browse/newreleases'>New Releases</Link></li>
        </ul>
    </nav>
)

export default HeaderBrowse;