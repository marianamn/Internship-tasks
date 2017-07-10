import React from 'react';
import './Artist.css';

const Artist = (props) => {
    return (
        <div className='artist'>
            <div className='artist-info'>
                <p className='followers'>{props.artistInfo.followers} FOLLOWERS</p>
                <p className='artist-name'>{props.artistInfo.name}</p>
                <img src={props.artistInfo.imageUrl} alt='' />
            </div>

            <h2>Albums</h2>
        </div>
    );
}

export default Artist;