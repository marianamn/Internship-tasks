import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchHeader from '../../components/header-search/HeaderSearch';
import SearchedDetails from '../../containers/search-details/SearchedDetails';
import { searchedDataFetchData, clearSearch } from '../../actions/search';
import { withRouter } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.type = '';
        this.searchValue = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.querySelector('.search').classList.add('active');
        document.querySelector('.your-music').classList.remove('active');
        document.querySelector('.browse').classList.remove('active');
    }

    componentWillUnmount() {
        this.props.clearSearch();
    }

    getSearchType(pathname) {
        let routAsArray = pathname.split('/');
        let route = routAsArray[routAsArray.length - 1];
        let searchedType = route.substring(0, route.length - 1);

        return searchedType;
    }

    handleChange(event) {
        this.searchValue = event.target.value;

        let pathname = this.props.location.pathname;
        this.type = this.getSearchType(pathname);

        if (this.searchValue.length !== 0) {
            this.props.searchedDataFetch(this.type, this.searchValue);
        }
    }

    handleClick(e) {
        this.props.clearSearch();
        document.querySelector('.input-search').focus();

        let pathname = e.target.attributes.href.textContent;
        this.type = this.getSearchType(pathname);

        if (this.searchValue.length !== 0) {
            this.props.searchedDataFetch(this.type, this.searchValue);
        }
    }

    render() {
        return (
            <div className='search'>
                <div className='search-bar'>
                    <p>Search for an Artist, Song, Album or Playlist</p>

                    <DebounceInput
                        className='input-search'
                        placeholder='Start typing...'
                        debounceTimeout={150}
                        onChange={this.handleChange} />
                </div>

                <SearchHeader click={this.handleClick}></SearchHeader>

                <SearchedDetails albums={this.props.searchItems}
                    type={this.type}>
                </SearchedDetails>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        searchItems: state.searchItems
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        searchedDataFetch: (type, searchParam) => dispatch(searchedDataFetchData(type, searchParam)),
        clearSearch: () => dispatch(clearSearch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));