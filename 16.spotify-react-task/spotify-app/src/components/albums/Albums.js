import React from 'react';
import { Link } from 'react-router-dom';
import './Albums.css';

const Albums = (props) => {
    let albums = [];
    
    if (props.albums) {
        albums = props.albums.map((album) =>
            <li key={album.id}>
                {album.owner ? (
                    <Link to={'/user/' + album.owner + '/playlist/' + album.id }><img src={album.imagesUrl} alt='' /></Link>
                ) : (
                    <Link to={props.url + album.id}><img src={album.imagesUrl}alt='' /></Link>
                    )}

                <p>{album.albumName}</p>
            </li>
        );
    }


    return (
        <div className='albums'>
            <ul>{albums}</ul>
        </div>
    );
}

export default Albums;