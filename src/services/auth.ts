import axios from 'axios';
import { User } from '../types/user';

const baseUrl = 'http://localhost:3000/auth';

async function login(email: string, password: string): Promise<User> {
    const { data } = await axios.post(
        `${baseUrl}/login`,
        { email, password },
    );

    return data;
}

const authService = {
    login,
};

export default authService;