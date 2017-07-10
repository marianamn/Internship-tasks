import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderBrowse.css';

const HeaderBrowse = () => (
    <nav className='navigation'>
        <ul>
            <li><Link to='/browse/featured'>Featured<p></p></Link></li>
            <li><Link to='/browse/genres'>Genres & Moods<p></p></Link></li>
            <li><Link to='/browse/new-releases'>New Releases<p></p></Link></li>
        </ul>
    </nav>
)

export default HeaderBrowse;