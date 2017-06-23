import React, { Component } from 'react';

import './Header.css';

import HeaderBrowse from '../../components/header/HeaderBrowse';
import HeaderPlaylist from '../../components/header/HeaderPlaylist';

function displayContent(location){
    switch(location){
        case 'browse': return <HeaderBrowse></HeaderBrowse>;
        case 'collection' : return <HeaderPlaylist></HeaderPlaylist>;
        default: return <div></div>
    }
}

class Header extends Component {
    render() {
        let pathname =  window.location.pathname.slice(1);
        let location = pathname.substring(0, pathname.indexOf('/'));

        return (
            <header className="header">
                {displayContent(location)}
            </header>
        );
    }
}

export default Header;