import { LoaderIcon } from 'lucide-react';

export default function Loader() {
    return (
        <div className='h-screen flex items-center text-yellow-500 justify-center'>
            <LoaderIcon className='animate-spin' size={42} />
        </div>
    );
}