import React, { Component } from 'react';
import { featuredAlbumsFetchData } from '../../actions/featuredAlbums';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

import './Featured.css';

class Featured extends Component {
    componentDidMount() {
        this.props.featuredAlbumsFetch();
        document.querySelector('.search').classList.remove('active');
        document.querySelector('.your-music').classList.remove('active');
        document.querySelector('.browse').classList.add('active');
    }

    render() {
        return (
            <div className='component-container featured'>
                <h2>New Releases</h2>
                <Albums albums={this.props.featuredAlbums}
                    url='/user/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        featuredAlbums: state.featuredAlbums
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        featuredAlbumsFetch: () => dispatch(featuredAlbumsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Featured);