import { User } from './user';

export interface Comment {
    id: string,
    content: string,
    post: string,
    user: User,
    createdAt: string;
}