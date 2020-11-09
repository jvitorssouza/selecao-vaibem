import React from 'react';
import { decode } from 'jsonwebtoken';
import { BrowserRouter, Switch } from 'react-router-dom';

// Authentications Pages
import AuthenticationRoutes from '~/pages/authentication';
import PrivateRoutes from '~/pages/private';
import useUser from '~/util/Hooks/UseUser';
import DashboardLayout from '~/layout';

const Routes: React.FC = () => {
    const { user } = useUser();

    const token: any = decode(user?.token);
    const tokenIsValid = Date.now() <= token?.exp * 1000;

    const isAuthenticated = user && user.id !== 0 && tokenIsValid;

    return (
        <BrowserRouter>
            <Switch>
                {isAuthenticated ? (
                    <DashboardLayout>
                        <PrivateRoutes />
                    </DashboardLayout>
                ) : (
                    <AuthenticationRoutes />
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
