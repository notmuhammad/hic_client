import { Comment } from './comment';
import { User } from './user';

export interface Post {
    id: string,
    title: string,
    content: string,
    author: User
    comments: Comment[]
    createdAt: string
}