import { useEffect, useState } from "react";
import postsService from "../services/posts";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postsService.getAllPosts()
            .then(resp => resp.data)
            .then(setPosts)
    }, [])

    if (!posts) {
        return <div>Loading posts...</div>
    }

    return (
        <div className="flex flex-col divide-y-[1px]">
        {
            posts?.map(post => (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <h1>{ post.title }</h1>
                    <p>{ post.author.firstName }</p>
                    <p>{ post.createdAt }</p>
                    <pre className="text-wrap">
                        { post.content.substr(0, 300) }
                        <span className="inline-flex items-center justify-center ml-2 font-bold underline decoration-2">
                            Read more <ChevronRight size={18} />
                        </span>
                    </pre>
                </Link>
            ))
        }
        </div>
    );
}