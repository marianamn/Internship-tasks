import React from 'react';
import Albums from '../../components/albums/Albums';
import TrackList from '../../components/tracks-list/TracksList';

const SearchedDetails = (props) => {
    return (
        <div>
            {props.type !== 'track' ?
                <Albums albums={props.albums}
                    url={'/' + props.type + '/'}>
                </Albums>
                :
                <TrackList tracksList={props.albums}
                    url='/albums/'>>
                </TrackList>
            }
        </div>
    )
}

export default SearchedDetails;