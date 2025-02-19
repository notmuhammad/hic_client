import { Comment as CommentT } from '../types';

export default function Comment(
    { comment }: 
    { comment: CommentT }
) {
    return (
        <div>
            <p className="font-bold">{ comment.user.firstName } { comment.user.lastName }</p>
            <pre>{ comment.content }</pre>
        </div>
    );
}