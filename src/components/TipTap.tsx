import { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import postsService from '../services/posts';

import Button from './ui/Button';
import { Bold, Code, CodeSquare, Italic, List, ListOrdered, PencilIcon, Quote, Undo2 } from 'lucide-react';

export default function TipTap(
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
                    'border-slate-200 ': editable,
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
                <div
                    hidden={!editable}
                    className="sticky bottom-0 left-0 right-0 p-2 flex items-center gap-2 bg-white rounded-b-2xl border-[1px] border-t-0 border-slate-200"
                >
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
        </>
    );
}
