import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import user from './addUserReducer';
import featuredAlbums from './getFeaturedAlbumsReducer';
import albumDetails from './getAlbumDetailsReducer';
import albumsByGenres from './getAlbumsByGenres';
import albumsInGenre from './albumsInGenreReducer';
import newReleases from './newReleaseReducer';
import newReleaseDetails from './newReleaseDetailsReducer';
import userPlaylists from './getUserPlaylistsReducer';
import followedArtists from './followedArtistsReducer';
import artist from './artistReducer';
import userAlbums from './userAlbumsReducer';
import searchItems from './searchReducer';
import userDetails from './userDetailsReducer';

const rootReducer = combineReducers({
    routing,
    user,
    featuredAlbums,
    albumDetails,
    albumsByGenres,
    albumsInGenre,
    newReleases,
    newReleaseDetails,
    userPlaylists,
    followedArtists,
    artist,
    userAlbums,
    searchItems,
    userDetails
});

export default rootReducer;