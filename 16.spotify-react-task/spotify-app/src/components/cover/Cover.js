import React from 'react';
import { Link } from 'react-router-dom';
import './Cover.css';

const Cover = (props) => {
    return (
        <div className='cover'>
            <img src={props.coverDetails.imageUrl} alt=''/>
            
            <div className='cover-details'>
                <h3>{props.coverDetails.name}</h3>
                
                <p className='owner'>
                    By
                    {props.coverDetails.owner ?
                    <Link to={'/user/' + props.coverDetails.owner}> {props.coverDetails.owner}</Link>
                    :''
                    }
                </p>

                <p>{props.coverDetails.description}</p>

                <p>{props.coverDetails.tracksCount} songs</p>
            </div>

            <button>Play</button>
            <p>Follow</p>
        </div>
    );
}

export default Cover;