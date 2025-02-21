import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useContext, useEffect } from 'react';
import loginService from '../services/loginService';
import usersService from '../services/usersService';
import { useNavigate } from 'react-router-dom';
import { User2 } from 'lucide-react';
import Button from './ui/Button';

export default function Interface() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    // Fetch user's access_token from localStorage or redirect to login page
    useEffect(() => {
        console.log(user.state)
        if (!user.state) {
            const access_token = localStorage.getItem('access_token');
            console.log(access_token)
            if (access_token) {
                usersService.getProfileByToken(access_token)
                    .then(data => user.dispatch({ type: 'login', payload: { ...data, access_token } }));
                    
                return;
            }
            // else  {
            //     navigate('/auth/login');
            //     return;
            // }
        }
    }, []);

    return (
        <div className='size-full bg-slate-100'>
            <Navbar />
            <div className='mx-auto w-2/3 bg-white h-full'>
                <Outlet />
            </div>
        </div>
    );
}

function Navbar() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 left-0 right-0 flex  items-center px-8 py-4 bg-white select-none">
            <h1 className="font-9xl font-eb">HIC Blogs</h1>
            <div className="ml-auto flex items-center gap-2 text-slate-600">
                {
                    user.state
                        ? <>
                            <p>{ user.state.firstName } { user.state.lastName} </p>
                            <User2 />
                        </>
                        : <Button onClick={() => navigate('/auth/login')}>Login</Button>
                }
            </div>
        </div>
    );
}