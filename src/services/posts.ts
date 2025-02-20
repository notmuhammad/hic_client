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

async function update(postId: string, content: string) {
    const resp = await axios.patch(`${baseUrl}/${postId}`, { content });
    console.log(resp.status);

    return resp.data;
}

const postsService = {
    getAllPosts,
    getPost,
    update,
};

export default postsService;