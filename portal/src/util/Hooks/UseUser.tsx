import { useContext } from 'react';

import { AuthenticationContext } from '../Contexts/Authentication';

export default function useUser() {
    const context = useContext(AuthenticationContext);
    const { user, setUser } = context;

    return { user, setUser };
}
