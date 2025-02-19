import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export async function getAllPosts() {
    const posts = await axios.get(`${baseUrl}/posts`);
    return posts;
}

export async function getPost(id: string) {
    const post = await axios.get(`${baseUrl}/posts/${id}`);
    return post;
}