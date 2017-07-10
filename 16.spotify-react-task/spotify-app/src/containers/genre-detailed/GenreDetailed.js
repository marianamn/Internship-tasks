import React, { Component } from 'react';
import { albumsInGenreFetchData } from '../../actions/albumsInGenre';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';
import './GenreDetailed.css';

class GenreDetailed extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let pathnameAsArray = pathname.split('/');
        let genre = pathnameAsArray[pathnameAsArray.length - 1];

        this.props.albumsInGenreFetch(genre);
    }

    render() {
        return (
            <div className='component-container popular-playlists'>
                <h2>Popular Playlists</h2>

                <Albums albums={this.props.albumsInGenre}
                    url='/genres/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        albumsInGenre: state.albumsInGenre
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        albumsInGenreFetch: (genre) => dispatch(albumsInGenreFetchData(genre))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreDetailed);