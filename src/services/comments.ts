import axios from 'axios';

// const baseUrl = 'http://localhost:3000/comments';
const baseUrl = 'https://hicserver-production.up.railway.app/comments';

async function send(post: string, user: string, content: string) {
    const comment = await axios.post(baseUrl, { post, user, content });
    return comment;
}

const commentsService = {
    send
};

export default commentsService;