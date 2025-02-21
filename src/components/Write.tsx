import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import postsService from '../services/posts';
import Button from './ui/Button';
import { Bold, Code, CodeSquare, Italic, List, ListOrdered, Quote, Undo2 } from 'lucide-react';
import Input from './ui/Input';
import useField from '../hooks/useField';

export default function Write() {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Write your story, for the world is reading!</p>',
        editable: true,
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 focus-within:outline-0 border-[1px] border-b-0 rounded-2xl rounded-b-none border-slate-200 '
            }
        }
    });
    const title = useField('Untitled post');

    async function handlePublish() {
        if (!user.state) {
            throw new Error('Unauthorized to create a post.');
        }

        console.log('publishing...')
        await postsService.create(title.value, editor?.getHTML(), user.state);
        console.log('published!');
    }

    function handleCancel() {
        if (confirm('Are you sure you want to discard this post?'))
            navigate('/');
    }

    return (
        <div className='flex flex-col gap-2 p-4'>
            <input
                className='text-4xl p-2 border-[1px] border-slate-200 rounded-2xl outline-none focus:border-yellow-500'
                value={title.value}
                onChange={title.onChange}
                type='text'
                name='title'
                id='title'
            />
            <div className='rounded-2xl transition-shadow hover:shadow-lg focus-within:shadow-lg'>
                <EditorContent editor={editor} />
                <div className="sticky bottom-0 left-0 right-0 p-2 flex items-center gap-2 bg-white rounded-b-2xl border-[1px] border-t-0 border-slate-200">
                    <Button onClick={handlePublish}>Publish</Button>
                    <Button rounded={false} sm variant={editor?.isActive('bold') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('italic') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('orderedList') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('bulletList') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('blockquote') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('code') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleCode().run()}><Code /></Button>
                    <Button rounded={false} sm variant={editor?.isActive('codeBlock') ? 'secondary' : 'ghost'} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}><CodeSquare /></Button>
                    <Button rounded={false} sm variant='ghost' onClick={handleCancel} right><Undo2 /></Button>
                </div>
            </div>
        </div>
    )
}