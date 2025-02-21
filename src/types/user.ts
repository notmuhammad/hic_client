export interface User {
    access_token: string,
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: string,
}

export type UserState = User | null;

export type UserReducerAction = 
    | UserReducerLoginAction
    | UserReducerLogoutAction;

export interface UserReducerLoginAction {
    type: 'login',
    payload: User
}

export interface UserReducerLogoutAction {
    type: 'logout',
    payload: never
}

export interface UserContextType {
    state: UserState,
    dispatch: React.ActionDispatch<[UserReducerAction]>
}