import React, { Component } from 'react';
import { followedArtistsFetchData } from '../../actions/followedArtists';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

import './FollowedArtists.css';

class FollowedArtists extends Component {
    componentDidMount() {
        this.props.followedArtistsFetch();
    }

    render() {
        return (
            <div className='component-container artists'>
                <Albums albums={this.props.followedArtists}
                    url='/artist/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        followedArtists: state.followedArtists
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        followedArtistsFetch: () => dispatch(followedArtistsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowedArtists);