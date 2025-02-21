import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useContext, useEffect } from 'react';
import usersService from '../services/users';
import { useNavigate } from 'react-router-dom';
import { Bell, DoorOpen, Home, Pen, Settings, User2 } from 'lucide-react';
import Button from './ui/Button';

export default function Interface() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    // Fetch and update user's information if access_token is found in localStorage
    useEffect(() => {
        if (!user.state) {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                usersService.getProfileByToken(access_token)
                    .then(data => user.dispatch({ type: 'login', payload: { ...data, access_token } }));
                    
                return;
            }
            // Redirect to login page if no access_token found
            // else  {
            //     navigate('/auth/login');
            //     return;
            // }
        }
    }, [user]);

    return (
        <div className='flex flex-col size-full overflow-hidden bg-slate-100'>
            <Navbar />
            <div className='relative flex size-full justify-center overflow-y-scroll'>
                <div className='sticky top-0 flex flex-col gap-2 p-5'>
                    <Button variant='secondary' onClick={() => navigate('/')}><Home />Home</Button>
                    <Button variant='secondary' onClick={() => navigate('/')}><Bell />Notifications</Button>
                    <Button onClick={() => navigate('/write')}><Pen />Write</Button>
                    {
                        user.state && 
                        <div className='mt-auto mx-auto'>
                            <Button variant='ghost' onClick={() => user.dispatch({ type: 'logout' })}><DoorOpen />Logout</Button>
                            <Button variant='secondary' onClick={() => navigate('/')}><Settings />Settings</Button>
                        </div>
                    }
                </div>

                <div className='w-2/3 h-fit bg-white '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

function Navbar() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className='flex items-center px-8 py-4 bg-white select-none'>
            <h1 className='font-9xl font-eb'>HIC Blogs</h1>
            <div className='ml-auto flex items-center gap-2 text-slate-600'>
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