/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, {
    createContext, ReactNode, useContext, useEffect, useState
} from 'react';
import api from '../services/api';

interface IAuthContextData {
    signed: boolean;
    user: object | null;
    login(user: object): Promise<void>;
    Logout(): void;
}

interface BaseLayoutProps {
    children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FunctionComponent<BaseLayoutProps> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    function verifyAuthenticated() {
        const storagedUser = sessionStorage.getItem('@App:cod');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            if (storagedToken === undefined || storagedUser === undefined) {
                sessionStorage.clear();
            }

            setUser({ cod: storagedUser });
            api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
        }
    }

    useEffect(() => {
        verifyAuthenticated();
    }, []);

    async function login(userData: object) {
        const response = await api.post('/login', userData);
        if (response.data.Error) {
            // eslint-disable-next-line no-alert
            window.alert(`Ocorreu um erro: ${response.data.Error}`);
        } else {
            setUser(response.data.user);
            api.defaults.headers.common.Authorization = `Bearer ${response.data.logged.token}`;
            sessionStorage.setItem('@App:cod', response.data.logged.data.id);
            sessionStorage.setItem('@App:token', response.data.logged.token);

            verifyAuthenticated();
        }
    }

    function Logout() {
        sessionStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: Boolean(user), user, login, Logout
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
