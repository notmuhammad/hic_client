import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useContext, useEffect } from 'react';
import loginService from '../services/loginService';
import usersService from '../services/usersService';

export default function Interface() {
    const user = useContext(UserContext);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            usersService.getProfileByToken(access_token)
                .then(data => user.dispatch({ type: 'login', payload: { ...data, access_token } }));
                
            return;
        }

        loginService.login('alawy', '123')
            .then(data => user.dispatch({ type: 'login', payload: data }));
    }, []);

    return (
        <div className='mx-auto w-2/3 bg-white'>
            <Outlet />
        </div>
    );
}