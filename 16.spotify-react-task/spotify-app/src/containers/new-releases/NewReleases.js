import React, { Component } from 'react';
import { newReleasesAlbumsFetchData } from '../../actions/newReleases';
import { connect } from 'react-redux';
import Albums from '../../components/albums/Albums';

class NewReleases extends Component {
    componentDidMount() {
        this.props.newReleasesAlbumsFetch();
    }

    render() {
        return (
            <div className='component-container'>
                <h2>New Albums and Singles</h2>
                <Albums albums={this.props.newReleases}
                    url='/album/'>
                </Albums>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        newReleases: state.newReleases
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        newReleasesAlbumsFetch: () => dispatch(newReleasesAlbumsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);