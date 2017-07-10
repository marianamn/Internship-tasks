import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function isAuthenticated() {
    if (localStorage.getItem('user')) {
        return true;
    } else {
        return false;
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

export default PrivateRoute;