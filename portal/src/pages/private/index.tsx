import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

// Pages
import EstablishmentsRoutes from './Establishments';

const PrivateRoutes: React.FC = () => {
    return (
        <Switch>
            <ToastProvider
                autoDismiss
                autoDismissTimeout={6000}
                placement="top-center"
            >
                <EstablishmentsRoutes />
                <Redirect to="/establishments" />
            </ToastProvider>
        </Switch>
    );
};

export default PrivateRoutes;
