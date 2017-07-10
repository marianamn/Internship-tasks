import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../components/private-route/PrivateRoute';
import './App.css';

import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../containers/header/Header';
import Login from '../login/Login';
import Callback from '../callback/Callback';
import Featured from '../featured/Featured';
import YourMusic from '../your-music/YourMusic';
import UserAccount from '../user-account/UserAccount';
import AlbumDetails from '../album-details/AlbumDetails';
import GenresAndMoods from '../genres-and-moods/GenresAndMoods';
import GenreDetailed from '../genre-detailed/GenreDetailed';
import NewReleases from '../new-releases/NewReleases';
import PlaylistDetails from '../playlist-details/PlaylistDetails';
import FollowedArtists from '../followed-artists/FollowedArtists';
import ArtistDetails from '../artist-details/ArtistDetails';
import UserAlbums from '../user-albums/UserAlbums';
import Search from '../search/Search';
import UserPlaylists from '../user-playlists/UserPlaylists';

class App extends Component {
  render() {
    return (
      <main className='container'>
        <Sidebar className='sidebar' user={localStorage.getItem('user')}></Sidebar>
        <section className='content'>
          <Header></Header>

          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/callback' exact component={Callback} />

            <PrivateRoute path='/browse/featured' exact component={Featured} />
            <PrivateRoute path='/browse/genres' exact component={GenresAndMoods} />
            <PrivateRoute path='/browse/new-releases' exact component={NewReleases} />

            <PrivateRoute path='/genres/:genre' exact component={GenreDetailed} />
            <PrivateRoute path='/artist/:artistId' exact component={ArtistDetails} />
            <PrivateRoute path='/album/:albumId' exact component={PlaylistDetails} />

            <PrivateRoute path='/user/:owner/playlist/:id' exact component={AlbumDetails} />
            <PrivateRoute path='/user/:id' exact component={UserPlaylists} />
            <PrivateRoute path='/settings/account' exact component={UserAccount} />

            <PrivateRoute path='/collection/playlists' exact component={YourMusic} />
            <PrivateRoute path='/collection/artists' exact component={FollowedArtists} />
            <PrivateRoute path='/collection/albums' exact component={UserAlbums} />

            <PrivateRoute path='/search/artists' exact component={Search} />
            <PrivateRoute path='/search/tracks' exact component={Search} />
            <PrivateRoute path='/search/albums' exact component={Search} />
            <PrivateRoute path='/search/playlists' exact component={Search} />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
