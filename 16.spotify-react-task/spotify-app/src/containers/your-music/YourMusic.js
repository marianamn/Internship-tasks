import React, { Component } from 'react';
import { userPlaylistsFetchData } from '../../actions/userPlayLists';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

class YourMusic extends Component {
    constructor(props){
        super(props);
        this.user = localStorage.getItem('user');
    }

    componentDidMount() {
        this.props.userPlaylistsFetch();

        document.querySelector('.search').classList.remove('active');
        document.querySelector('.your-music').classList.add('active');
        document.querySelector('.browse').classList.remove('active');
    }

    render() {
        return (
            <div className='component-container'>
                <Albums albums={this.props.userPlaylists}
                    url={ '/user/' + this.user + '/playlist/' }>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        userPlaylists: state.userPlaylists
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        userPlaylistsFetch: () => dispatch(userPlaylistsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourMusic);