import React, { Component } from 'react';
import { albumDetailsFetchData, clearAlbumDetails } from '../../actions/albumDetails';
import { connect } from 'react-redux';
import TrackList from '../../components/tracks-list/TracksList';

class AlbumDetails extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let pathnameAsArray = pathname.split('/');
        //console.log(pathnameAsArray);

        let id = pathnameAsArray[pathnameAsArray.length - 1];
        let owner = pathnameAsArray[pathnameAsArray.length - 3];

        this.props.albumDetailsFetch(id, owner);
    }

    componentWillUnmount() {
        this.props.clearAlbumDetails();
    }
    
    render() {

        return (
            <div className='component-container'>
                <TrackList tracksList={this.props.albumDetails.tracks}
                    cover={this.props.albumDetails.coverDetails}
                    url='/albums/'>>
                </TrackList>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        albumDetails: state.albumDetails
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        albumDetailsFetch: (id, owner) => dispatch(albumDetailsFetchData(id, owner)),
        clearAlbumDetails: () => dispatch(clearAlbumDetails())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);