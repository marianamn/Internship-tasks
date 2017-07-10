import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Header.css';

import HeaderBrowse from '../../components/header-browse/HeaderBrowse';
import HeaderPlaylist from '../../components/header-playlist/HeaderPlaylist';

function displayContent(location) {
    switch (location) {
        case 'browse':
            //document.querySelector('.browse').classList.add('active');
            return <HeaderBrowse></HeaderBrowse>;
        case 'collection': return <HeaderPlaylist></HeaderPlaylist>;
        default: return <div></div>
    }
}

class Header extends Component {
    render() {
        let pathAsArray = this.props
            .location
            .pathname
            .split('/');

        let location = pathAsArray[1];

        return (
            <header className='header'>
                {displayContent(location)}
            </header>
        );
    }
}

export default withRouter(Header);