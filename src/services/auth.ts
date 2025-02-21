import axios from 'axios';
import { User } from '../types/user';

// const baseUrl = 'http://localhost:3000/auth';
const baseUrl = 'https://hicserver-production.up.railway.app/auth';

async function login(email: string, password: string): Promise<User> {
    const { data } = await axios.post(
        `${baseUrl}/login`,
        { email, password },
    );

    return data;
}

async function signup(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const { data } = await axios.post(
        `${baseUrl}/signup`,
        { firstName, lastName, email, password },
    );

    return data;
}

const authService = {
    login,
    signup
};

export default authService;