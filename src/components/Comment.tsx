import { Comment as CommentT } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Comment(
    { comment, pending = false }: 
    { comment: CommentT, pending?: boolean }
) {
    return (
        <div className={`bg-neutral-100 rounded-2xl p-4 mb-2 ${pending && 'opacity-50'}`}>
            <div className="flex gap-2 items-center">
                <p className='font-semibold text-neutral-700'>{ comment.user.firstName } { comment.user.lastName }</p>
                <p className='text-sm text-black/50'>{ dayjs(comment.createdAt).subtract(2, 'hour').fromNow() }</p>
            </div>
            <p className='prose'>{ comment.content }</p>
        </div>
    );
}