import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderSearch.css';

const HeaderSearch = (props) => (
    <div className='search-nav'>
        <ul>
            <li onClick={props.click}><Link to='/search/artists'>Artists<p></p></Link></li>
            <li onClick={props.click}><Link to='/search/tracks'>Tracks<p></p></Link></li>
            <li onClick={props.click}><Link to='/search/albums'>Albums<p></p></Link></li>
            <li onClick={props.click}><Link to='/search/playlists'>Playlists<p></p></Link></li>
        </ul>
    </div>
)

export default HeaderSearch;