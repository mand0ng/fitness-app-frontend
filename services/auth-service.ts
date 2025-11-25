import { ILoginCandidate, ICandidate, IUser } from "../context/user-context";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authService = {
    login: async (candidate: ILoginCandidate) => {
        if (!API_URL) throw new Error('API_URL is not defined');

        const response = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidate),
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Login failed.');

        return data;
    },

    createUser: async (user: ICandidate) => {
        if (!API_URL) throw new Error('API_URL is not defined');

        const response = await fetch(`${API_URL}/create-user/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'User signup failed.');

        return data;
    },

    checkToken: async (token: string) => {
        if (!API_URL) throw new Error('API_URL is not defined');
        const response = await fetch(`${API_URL}/auth/check-token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Token check failed.');

        return data;
    },

    logout: async () => {
        Cookies.remove('token');
    },

};