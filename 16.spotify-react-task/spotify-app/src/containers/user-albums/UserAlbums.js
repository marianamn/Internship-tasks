import React, { Component } from 'react';
import { userAlbumsFetchData } from '../../actions/userSavedAlbums';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

class UserAlbums extends Component {
    componentDidMount() {
        this.props.userAlbumsFetch();
    }

    render() {
        return (
            <div className='component-container'>
                <Albums albums={this.props.userAlbums}
                    url='/album/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        userAlbums: state.userAlbums
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        userAlbumsFetch: () => dispatch(userAlbumsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAlbums);