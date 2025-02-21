import axios from 'axios';
import { User } from '../types/user';

// const baseUrl = 'http://localhost:3000/users';
const baseUrl = 'https://hicserver-production.up.railway.app/users';

async function getProfileByToken(access_token: string): Promise<Omit<User, 'access_token'>> {
    const { data } = await axios.get(
        `${baseUrl}/profile`,
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    return data;
}

const usersService = {
    getProfileByToken
};

export default usersService;
