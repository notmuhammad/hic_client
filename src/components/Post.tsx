import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useField from '../hooks/useField';

import postsService from '../services/posts';
import commentsService from '../services/comments';

import TipTap from './TipTap';
import Comment from './Comment';
import { Send } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { Comment as CommentT } from '../types/comment';
import { ago } from './util/time';

export default function Post() {
    const [post, setPost] = useState(null);
    const params = useParams();

    useEffect(() => {
        postsService.getPost(params.postId!)
            .then(setPost);
    }, []);

    if (!post) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className='flex flex-col items-center px-4'>
            <div className='w-full flex flex-col items-start'>
                <h1 className='mt-8'>{ post.title }</h1>
                <div className="flex gap-2 items-center">
                    <p>by { post.author.firstName } { post.author.lastName }</p>
                    <p className='text-sm text-black/50'>{ ago(post.createdAt) }</p>
                </div>
            </div>
            <TipTap post={post} />

            <Comments post={post} />
        </div>
    );
}

function Comments(
    { post }:
    { post: any }
) {
    const [comments, setComments] = useState(post.comments);
    const [pendingComment, setPendingComment] = useState<CommentT | null>(null);
    const commentField = useField('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const now = new Date(Date.now() + 60 * 60 * 1000 * 2).toISOString();
        setPendingComment({
            id: '',
            content: commentField.value,
            post: post.id,
            user: post.author,
            createdAt: now
        });

        const { data: comment } = await commentsService.send(post.id, 'lhk862bp7073ddjktvydjv92', commentField.value);
        setPendingComment(null);
        setComments([...comments, comment]);
    }

    let commentsSection;
    if (!comments || (comments.length === 0)) {
        commentsSection = <p>No comments yet. Be the first to comment!</p>;
    }
    else {
        commentsSection = comments
            .toSorted((a, b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(comment => (
                <Comment
                    comment={comment}
                    key={comment.id}
                />
            ));
    }

    return (
        <div className='w-full mt-6 p-4 border-t-2 border-t-slate-100'>
            <h2>Comments</h2>

            <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2 mb-2'>
                <Input
                    required
                    value={commentField.value}
                    onChange={commentField.onChange}
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder='Nice post!'
                />
                <Button type="submit"><Send /></Button>
            </form>
            <div>
                { 
                    pendingComment && <Comment pending comment={pendingComment} />
                }
                { commentsSection }
            </div>
        </div>
    );
}
