import React, { createContext, useEffect, useState } from 'react';

interface Profile {
    id: number;
    name: string;
}

interface LoggedUser {
    id: number;
    name: string;
    email: string;
    profileId: number;
    profile: Profile;
    token: string;
    permissions: string[];
}

export const InitialUser = {
    id: 0,
    name: '',
    email: '',
    profileId: 0,
    profile: {
        id: 0,
        name: '',
    },
    token: '',
    permissions: [],
};

export const AuthenticationContext = createContext<{
    user: LoggedUser;
    setUser: Function;
}>({ user: InitialUser, setUser: () => {} });

const AuthenticationProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<LoggedUser>(() => {
        const userData = localStorage.getItem('userData');

        if (userData) {
            return JSON.parse(userData);
        }

        localStorage.setItem('userData', JSON.stringify(InitialUser));
        return InitialUser;
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(user));
    }, [user]);

    return (
        <AuthenticationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
