import React, { Component } from 'react';
import { artistFetchData, clearArtist } from '../../actions/artist';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';
import Artist from '../../components/artist/Artist';

class ArtistDetails extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let pathnameAsArray = pathname.split('/');
        //console.log(pathnameAsArray);

        let id = pathnameAsArray[pathnameAsArray.length - 1];

        this.props.artistFetch(id);
    }

    componentWillUnmount() {
        this.props.clearArtist();
    }

    render() {
        return (
            <div className='component-container featured'>
                <Artist artistInfo={this.props.artist}></Artist>
                <Albums albums={this.props.artist.albums}
                    url='/album/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        artist: state.artist
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        artistFetch: (id) => dispatch(artistFetchData(id)),
        clearArtist: () => dispatch(clearArtist())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);