import React from 'react';

import GlobalStyle from '~/assets/styles/global';
import Routes from '~/Routes';

import AuthenticationProvider from '~/util/Contexts/Authentication';

function App() {
    return (
        <>
            <AuthenticationProvider>
                <GlobalStyle />
                <Routes />
            </AuthenticationProvider>
        </>
    );
}

export default App;
