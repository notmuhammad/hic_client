import { useEffect, useState } from 'react';
import postsService from '../services/posts';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { removeHTML } from '../util/parse';
import Loader from './ui/Loader';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        postsService.getAllPosts()
            .then(setPosts);
    }, []);

    if (!posts || posts.length === 0) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col p-2">
            <h1 className='font-eb text-6xl underline decoration-[4px] decoration-slate-200 mb-2 text-center'>All posts</h1>
            {
                posts?.map(post => (
                    <Link
                        to={`/post/${post.id}`}
                        key={post.id}
                        className='w-full overflow-x-hidden rounded-2xl group relative p-4 bg-transparent hover:bg-slate-200 transition-all'
                        // before:flex before:items-center before:justify-center before:text-4xl before:content-["Read_post"] before:backdrop-blur-lg before:opacity-0 hover:before:opacity-100 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-slate-800/10 '
                    >
                        <h1>{ post.title }</h1>
                        <div className="flex items-center gap-2">
                            <p>by { post.author.firstName } { post.author.lastName }</p>
                            <p className='text-slate-400 text-sm'>{ new Date(post.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) }</p>
                        </div>
                        <p className="break-all line-clamp-3 text-wrap text-slate-400 italic">
                            { removeHTML(post.content) }
                        </p>
                        <p className="inline-flex text-slate-500 items-center justify-center font-bold">
                            Read full post <ChevronRight size={18} />
                        </p>
                    </Link>
                ))
            }
        </div>
    );
}