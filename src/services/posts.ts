import axios from 'axios';

const baseUrl = 'http://localhost:3000/posts';

async function getAllPosts() {
    const posts = await axios.get(baseUrl);
    return posts;
}

async function getPost(id: string) {
    const post = await axios.get(`${baseUrl}/${id}`);
    return post;
}

const postsService = {
    getAllPosts,
    getPost
};

export default postsService;