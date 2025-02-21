import axios from 'axios';
import { User } from '../types/user';

const baseUrl = 'http://localhost:3000/posts';

async function getAllPosts() {
    const { data } = await axios.get(baseUrl);
    return data;
}

async function getPost(id: string) {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    return data;
}

async function create(title: string, content: string, user: User) {
    const { data } = await axios.post(
        baseUrl,
        { title, content, author: user.id },
        { headers: { Authorization: `Bearer ${user.access_token}` }}
    );
    console.log(data);

    return data;
}

async function update(postId: string, content: string, access_token: string) {
    const resp = await axios.patch(
        `${baseUrl}/${postId}`,
        { content },
        { headers: { Authorization: `Bearer ${access_token}` }}
    );
    console.log(resp.status);

    return resp.data;
}

const postsService = {
    getAllPosts,
    getPost,
    create,
    update,
};

export default postsService;