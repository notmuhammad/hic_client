import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then(resp => resp.data)
            .then(setPosts)
    }, [])

    return (
        <div>
        {
            posts?.map(post => (
                <Link to={`/post/${post.id}`}>
                    <h1>{ post.title }</h1>
                    <p>{ post.author }</p>
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