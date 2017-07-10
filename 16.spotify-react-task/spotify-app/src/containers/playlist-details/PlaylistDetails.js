import React, { Component } from 'react';
import { newReleaseDerailsAlbumsFetchData, clearNewReleaseDetails } from '../../actions/newReleaseDetails';
import { connect } from 'react-redux';
import TrackList from '../../components/tracks-list/TracksList';

class PlaylistDetails extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let pathnameAsArray = pathname.split('/');
        //console.log(pathnameAsArray);

        let id = pathnameAsArray[pathnameAsArray.length - 1];

        this.props.newReleaseDerailsAlbumsFetch(id);
    }

    componentWillUnmount() {
        this.props.clearNewReleaseDetails();
    }

    render() {

        return (
            <div className='component-container'>
                <TrackList tracksList={this.props.newReleaseDetails.tracks}
                    cover={this.props.newReleaseDetails.coverDetails}
                    copyrights={this.props.newReleaseDetails.copyrights}>
                </TrackList>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        newReleaseDetails: state.newReleaseDetails
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        newReleaseDerailsAlbumsFetch: (id) => dispatch(newReleaseDerailsAlbumsFetchData(id)),
        clearNewReleaseDetails: () => dispatch(clearNewReleaseDetails())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetails);