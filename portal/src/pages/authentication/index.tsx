import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// Authentications Page
import Login from './Login';

const BASE_MODULE_URL = '/auth';

const AuthenticationRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${BASE_MODULE_URL}/login`} component={Login} />

                <Redirect to="/auth/login" />
            </Switch>
        </BrowserRouter>
    );
};

export default AuthenticationRoutes;
