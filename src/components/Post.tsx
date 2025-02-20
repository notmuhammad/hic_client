import { useEffect, useRef, useState } from 'react';
import postsService from '../services/posts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Comment from './Comment';
import useField from '../hooks/useField';
import { PencilIcon, Send, Undo2 } from 'lucide-react';
import commentsService from '../services/comments';
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';

dayjs.extend(relativeTime);

export default function Post() {
    const [post, setPost] = useState(null);
    const params = useParams();

    useEffect(() => {
        postsService.getPost(params.postId!)
            .then(resp => resp.data)
            .then(setPost);
    }, []);

    if (!post) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='w-full flex flex-col items-start px-4'>
                <h1 className='mt-8'>{ post.title }</h1>
                <div className="flex gap-2 items-center">
                    <p>by { post.author.firstName } { post.author.lastName }</p>
                    <p className='text-sm text-black/50'>{ dayjs(post.createdAt).subtract(2, 'hour').fromNow() }</p>
                </div>
            </div>
            <TipTap post={post} />

            <Comments post={post} />
        </div>
    );
}

function TipTap(
    { post }:
    { post: any }
) {
    const [editable, setEditable] = useState(false);
    const oldContent = useRef('');
    const editor = useEditor({
        extensions: [StarterKit],
        content: post.content,
        editable: editable,
        editorProps: {
            attributes: {
                class: clsx('prose max-w-none p-4 focus-within:outline-0 border-[1px] border-b-0 rounded-2xl rounded-b-none', {
                    'border-neutral-200 ': editable,
                    'border-transparent': !editable
                })
            }
        }
    });

    useEffect(() => {
        editor?.setEditable(editable);
        if (editable)
            oldContent.current = editor?.getHTML();
    }, [editor, editable]);

    async function handlePublish() {
        console.log('saving...')
        await postsService.update(post.id, editor?.getHTML());
        console.log('saved!')
        setEditable(false);
    }

    function handleCancel() {
        editor?.setEditable(false);
        editor?.commands.setContent(oldContent.current);
        setEditable(false);
    }

    return (
        <>
            <Button
                onClick={editable ? handleCancel : () => setEditable(true)}
            >
                <PencilIcon />Edit
            </Button>

            <div
                className={clsx('rounded-2xl', {
                    'transition-shadow hover:shadow-lg focus-within:shadow-lg': editable
                })}
            >
                <EditorContent editor={editor} />
                <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
                <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
                <div
                    hidden={!editable}
                    className="sticky bottom-0 left-0 right-0 p-2 flex items-center gap-2 bg-white/50 backdrop-blur-2xl rounded-b-2xl border-[1px] border-t-0 border-neutral-200"
                >
                    <Button
                        onClick={handlePublish}
                    >
                        Publish
                    </Button>
                    <Button variant='ghost' onClick={handleCancel} right><Undo2 /></Button>
                </div>
            </div>
        </>
    );
}

function Comments(
    { post }:
    { post: any }
) {
    const commentField = useField('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        commentsService.send(post.id, 'lhk862bp7073ddjktvydjv92', commentField.value);
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
    );
}

function Button(
    { children, variant = 'primary', right = false, ...props }: 
    {
        children: React.ReactNode,
        variant?: 'primary' | 'secondary' | 'ghost',
        right?: boolean,
    } & React.ComponentPropsWithoutRef<'button'>
) {
    return (
        <button
            {...props}
            className={clsx('flex gap-2 items-center cursor-pointer px-4 py-2 rounded-full',
                {
                    'text-white font-semibold bg-yellow-500 hover:bg-yellow-400 hover:shadow-md shadow-amber-200': variant === 'primary',
                    'text-black bg-neutral-200 hover:bg-neutral-100': variant === 'secondary',
                    'text-black/50 bg-transparent hover:bg-yellow-500/10 hover:text-black': variant === 'ghost',
                    'ml-auto': right
                }
            )}
        >
            { children }
        </button>
    )
}