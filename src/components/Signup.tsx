import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import useField from '../hooks/useField';

import authService from '../services/auth';

import { UserPlus2 } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';

export default function Signup() {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const firstName = useField('');
    const lastName = useField('');
    const email = useField('');
    const password = useField('');

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        const user = await authService.signup(
            firstName.value,
            lastName.value,
            email.value,
            password.value
        );

        dispatch({ type: 'login', payload: user });
        navigate('/');
    }

    return (
        <div className='size-full flex items-center justify-center bg-slate-100 '>
            <div className='bg-white rounded-2xl p-4 w-1/3'>
                <h1 className='mb-8'>Let's get you set up</h1>
                <form onSubmit={handleSignup} className='flex flex-col gap-2'>
                    <Input
                        value={firstName.value}
                        onChange={firstName.onChange}
                        placeholder='First name'
                        type='text'
                        name='first-name'
                        id='first-name'
                    />
                    <Input
                        value={lastName.value}
                        onChange={lastName.onChange}
                        placeholder='Last name'
                        type='text'
                        name='last-name'
                        id='last-name'
                    />
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
                    <Button type='submit' center><UserPlus2 />Sign up</Button>
                </form>
                <Button variant='ghost' onClick={() => navigate('/auth/login')}>Already have an account? Login</Button>
            </div>
        </div>
    );
}