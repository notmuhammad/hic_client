import { Comment as CommentT } from '../types/comment';
import { ago } from '../util/time';

export default function Comment(
    { comment, pending = false }: 
    { comment: CommentT, pending?: boolean }
) {
    return (
        <div className={`bg-slate-100 rounded-2xl p-4 mb-2 ${pending && 'opacity-50'}`}>
            <div className="flex gap-2 items-center">
                <p className='font-semibold text-slate-700'>{ comment.user.firstName } { comment.user.lastName }</p>
                <p className='text-sm text-black/50'>{ ago(comment.createdAt) }</p>
            </div>
            <p className='prose'>{ comment.content }</p>
        </div>
    );
}