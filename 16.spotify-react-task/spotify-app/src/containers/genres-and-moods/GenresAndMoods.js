import React, { Component } from 'react';
import { albumsByGenresFetchData } from '../../actions/albumsByGenres';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

class GenresAndMoods extends Component {
    componentDidMount() {
        this.props.albumsByGenresFetch();
    }

    render() {
        return (
            <div className='component-container'>
                <h2>Genres & Moods</h2>
                <Albums albums={this.props.albumsByGenres}
                    url='/genres/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        albumsByGenres: state.albumsByGenres
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        albumsByGenresFetch: () => dispatch(albumsByGenresFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresAndMoods);