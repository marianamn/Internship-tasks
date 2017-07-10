import React, { Component } from 'react';
import { userDetailsFetchData, clearUserDetails } from '../../actions/userDetails';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';
import './UserPlaylists.css';

class UserPlaylists extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let pathnameAsArray = pathname.split('/');

        let user = pathnameAsArray[pathnameAsArray.length - 1];

        this.props.userDetailsFetch(user);
    }

    componentWillUnmount() {
        this.props.clearUserDetails();
    }

    render() {
        return (
            <div className='component-container user-playlist'>
                <img src={this.props.userDetails.imageUrl} className='user-image' alt=''/>
                <p className='playlist-owner'>{this.props.userDetails.owner}</p>
                <h3>Public playlists</h3>

                <Albums albums={this.props.userDetails.playlists}
                    url={'/user/' + this.props.userDetails.owner + '/playlist/'}>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        userDetails: state.userDetails
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        userDetailsFetch: (user) => dispatch(userDetailsFetchData(user)),
        clearUserDetails: () => dispatch(clearUserDetails())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);