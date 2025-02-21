import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='bg-white py-44 flex items-center justify-center flex-col'>
            <p className="text-9xl font-bold font-eb text-yellow-500">404</p>
            <div className="flex items-center gap-2">
                <p className="text-xl">This page cannot be found.</p><Button onClick={() => navigate('/')}>Go back home?</Button>
            </div>
        </div>
    )
}