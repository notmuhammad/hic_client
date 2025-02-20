import { Outlet } from 'react-router-dom';

export default function Interface() {
    return (
        <div className='mx-auto w-2/3 bg-white'>
            <Outlet />
        </div>
    );
}