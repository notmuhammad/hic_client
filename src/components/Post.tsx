import { useEffect, useState } from 'react';
import postsService from '../services/posts';
import { useParams } from 'react-router-dom';

import Comment from './Comment';
import useField from '../hooks/useField';
import { Send } from 'lucide-react';
import commentsService from '../services/comments';

export default function Post() {
    const [post, setPost] = useState(null);
    const params = useParams();

    useEffect(() => {
        postsService.getPost(params.postId!)
            .then(resp => resp.data)
            .then(setPost)
    }, []);

    if (!post) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h1>{ post.title }</h1>
            <p>by { post.author.firstName } { post.author.lastName }</p>
            <pre>{ post.content }</pre>

            <Comments post={post} />
        </div>
    );
}

function Comments(
    { post }:
    { post: any }
) {
    const commentField = useField("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        commentsService.send(post.id, "lhk862bp7073ddjktvydjv92", commentField.value);
    }

    return (
        <div>
            <h3>Comments</h3>

            <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2'>
                <input
                    value={commentField.value}
                    onChange={commentField.onChange}
                    className='w-full'
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder='Nice post!'
                />
                <button type="submit"><Send /></button>
            </form>
            {
                !post.comments || (post.comments.length === 0)
                ? <p>No comments yet. Be the first to comment!</p> 
                : post.comments.map(comment => (
                    <Comment
                        comment={comment}
                        key={comment.id}
                    />
                ))
            }
        </div>
    )
}