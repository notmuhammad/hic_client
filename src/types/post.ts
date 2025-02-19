import { User } from '.';

export interface Post {
    id: string,
    title: string,
    content: string,
    author: User
}