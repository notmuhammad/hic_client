import { User } from '.';

export interface Comment {
    id: string,
    content: string,
    post: string,
    user: User
}