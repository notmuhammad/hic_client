import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useField from '../hooks/useField';

import postsService from '../services/posts';
import commentsService from '../services/comments';

import TipTap from './TipTap';
import Comment from './Comment';
import { Send } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { Comment as CommentType } from '../types/comment';
import { ago } from '../util/time';
import { Post as PostType } from '../types/post';
import { UserContext } from '../context/User';
import Loader from './ui/Loader';

export default function Post() {
    const [post, setPost] = useState<PostType | null>(null);
    const params = useParams();
    const navigate = useNavigate();

    // Fetch post
    useEffect(() => {
        postsService.getPost(params.postId!)
            .then(setPost)
            .catch(error => {
                if (error.response.status === 404)
                    navigate('/404');
            });
    }, []);

    // TODO: Create skeleton
    if (!post) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col items-center px-4'>
            <div className='w-full flex flex-col items-start'>
                <h1 className='mt-8'>{ post.title }</h1>
                <div className='flex gap-2 items-center'>
                    <p>by { post.author.firstName } { post.author.lastName }</p>
                    <p className='text-sm text-black/50'>{ ago(post.createdAt) }</p>
                </div>
            </div>
            <TipTap post={post} />

            <Comments post={post} />
        </div>
    );
}

// Comment section compnent. Includes comment posting form.
function Comments(
    { post }:
    { post: PostType }
) {
    const user = useContext(UserContext);
    const [comments, setComments] = useState<CommentType[]>(post.comments);
    const [pendingComment, setPendingComment] = useState<CommentType | null>(null);
    const commentField = useField('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!user.state)
            throw new Error('Unauthorized to comment.');

        const now = new Date(Date.now() + 60 * 60 * 1000 * 2).toISOString();
        setPendingComment({
            id: '',
            content: commentField.value,
            post: post.id,
            user: user.state,
            createdAt: now
        });

        const { data: comment } = await commentsService.send(post.id, user.state.id, commentField.value);
        setPendingComment(null);
        setComments([...comments, { ...comment, user: user.state }]);
        commentField.setValue('');
    }

    // If there are no comments, display a message. Otherwise, display the list of comments.
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

            {
                !user.state
                    ?
                    <Button onClick={() => navigate('/auth/login')}>Login to comment</Button>
                    :
                    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2 mb-2'>
                        <Input
                            required
                            value={commentField.value}
                            onChange={commentField.onChange}
                            type='text'
                            name='comment'
                            id='comment'
                            placeholder='Nice post!'
                        />
                        <Button type='submit'><Send /></Button>
                    </form>
            }
            <div>
                { 
                    pendingComment && <Comment pending comment={pendingComment} />
                }
                { commentsSection }
            </div>
        </div>
    );
}
