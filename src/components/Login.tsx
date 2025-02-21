import useField from '../hooks/useField';
import { useContext } from 'react';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';

import authService from '../services/auth';

import Button from './ui/Button';
import Input from './ui/Input';
import { DoorOpen } from 'lucide-react';

export default function Login() {
    const { dispatch } = useContext(UserContext);
    const email = useField('');
    const password = useField('');
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        const user = await authService.login(email.value, password.value);
        dispatch({ type: 'login', payload: user });
        navigate('/');
    }

    return (
        <div className='size-full flex items-center justify-center bg-slate-100 '>
            <div className='bg-white rounded-2xl p-4 w-1/3'>
                <h1 className='mb-8'>Welcome back!</h1>
                <form onSubmit={handleLogin} className='flex flex-col gap-2'>
                    <Input
                        value={email.value}
                        onChange={email.onChange}
                        placeholder='your@email.com'
                        type='email'
                        name='email'
                        id='email'
                    />
                    <Input
                        value={password.value}
                        onChange={password.onChange}
                        placeholder='**********'
                        type='password'
                        name='password'
                        id='password'
                    />
                    <Button type='submit' center><DoorOpen />Login</Button>
                </form>
                <Button variant='ghost' onClick={() => navigate('/auth/signup')}>Sign up</Button>
            </div>
        </div>
    );
}