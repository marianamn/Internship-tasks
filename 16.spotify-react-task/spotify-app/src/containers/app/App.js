import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../containers/header/Header';

import Login from '../login/Login';
import Callback from '../callback/Callback';

import Featured from '../featured/Featured';
import Search from '../search/Search';
import YourMusic from '../your-music/YourMusic';
import UserAccount from '../user-account/UserAccount';

class App extends Component {
  render() {
    return (
      <Router>
      <main className="container">
          <Sidebar className="sidebar"></Sidebar>
          <section className="content">
            <Header></Header>

            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/search/recent' exact component={Search} />
              <Route path='/browse/featured' exact component={Featured} />
              <Route path='/collection/playlists' exact component={YourMusic} />
              <Route path='/settings/account' exact component={UserAccount} />

              <Route path='/callback' exact component={Callback} />
            </Switch>
          </section>
        </main>
      </Router>
    );
  }
}

export default App;