import React from 'react';
import Cover from '../cover/Cover';
import { Link } from 'react-router-dom';
import './TracksList.css';

function millisecondsToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const TracksList = (props) => {
    let index = 1;

    let tracks = [];

    if (props.tracksList) {
        tracks = props.tracksList.map((track) =>
            <li key={track.trackId}>
                <div className='track-container'>
                    <div>
                        <p className='left'><span>{index++}. </span>{track.trackName}</p>
                        <p className='right duration'>
                            <i className='fa fa-circle circle disable' aria-hidden='true' ></i>
                            <i className='fa fa-circle circle disable' aria-hidden='true' ></i>
                            <i className='fa fa-circle circle disable' aria-hidden='true' ></i>
                            <span className='duration'>{millisecondsToMinutesAndSeconds(track.trackDuration_ms)}</span>
                        </p>
                    </div>

                    <div className='artists-container'>
                        <ul className='artists-list'>
                            {track.trackArtists.map((artist) =>
                                <li key={artist.id} className='left'>
                                    <Link to={'/artist/' + artist.id}>{artist.name} <span className='comma'>, </span></Link>
                                </li>
                            )}
                        </ul>

                        <p><i className='fa fa-circle circle' aria-hidden='true' ></i>{track.trackName}</p>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <div className='tracks'>
            <div>
                {props.cover ? <Cover coverDetails={props.cover}></Cover> : ''}

                <div className='track-list'>
                    <ul>
                        {tracks}
                    </ul>

                    <div className='copyright'>
                        <ul>
                            {props.copyrights ?
                                props.copyrights.map((copyright) =>
                                    <li key={index++}>
                                        <p>
                                            {copyright.text}
                                        </p>
                                    </li>
                                )
                                :
                                ''}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TracksList;