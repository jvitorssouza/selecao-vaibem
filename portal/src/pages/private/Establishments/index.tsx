import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EstablishmentsForm from './Form';
import EstablishmentsList from './List';

const ESTABLISHMENTS_MODULE_BASE_URL = '/establishments';

const EstablishmentsRoutes: React.FC = () => {
    return (
        <Switch>
            <Route
                path={`${ESTABLISHMENTS_MODULE_BASE_URL}`}
                exact
                component={EstablishmentsList}
            />

            <Route
                path={`${ESTABLISHMENTS_MODULE_BASE_URL}/create`}
                component={EstablishmentsForm}
            />

            <Route
                path={`${ESTABLISHMENTS_MODULE_BASE_URL}/edit/:id`}
                component={EstablishmentsForm}
            />
        </Switch>
    );
};

export default EstablishmentsRoutes;
