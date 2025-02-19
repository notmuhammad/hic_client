import { useEffect, useState } from 'react';
import { getPost } from '../services/posts';
import { useParams } from 'react-router-dom';

import Comment from './Comment';

export default function Post() {
    const [post, setPost] = useState(null);
    const params = useParams();

    useEffect(() => {
        getPost(params.postId!)
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

            <div>
                <h3>Comments</h3>
                {
                    post.comments.map(comment => (
                        <Comment
                            comment={comment}
                            key={comment.id}
                        />
                    ))
                }
            </div>
        </div>
    );
}