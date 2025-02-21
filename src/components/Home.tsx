import { useEffect, useState } from 'react';
import postsService from '../services/posts';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        postsService.getAllPosts()
            .then(setPosts);
    }, []);

    if (!posts) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className="flex flex-col p-2">
            <h1 className='font-eb text-6xl border-b-2 border-slate-200 mb-6'>Recent posts</h1>
            {
                posts?.map(post => (
                    <Link
                        to={`/post/${post.id}`}
                        key={post.id}
                        className='rounded-2xl group relative overflow-hidden p-4 bg-transparent hover:bg-slate-200 transition-all'
                        // before:flex before:items-center before:justify-center before:text-4xl before:content-["Read_post"] before:backdrop-blur-lg before:opacity-0 hover:before:opacity-100 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-slate-800/10 '
                    >
                        <h1>{ post.title }</h1>
                        <p>By { post.author.firstName } { post.author.lastName }</p>
                        <p>{ post.createdAt }</p>
                        <pre className="text-wrap line-clamp-3">
                            { post.content }
                        </pre>
                        <p className="inline-flex items-center justify-center font-bold underline decoration-2">
                            Read more <ChevronRight size={18} />
                        </p>
                    </Link>
                ))
            }
        </div>
    );
}