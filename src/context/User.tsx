import { createContext, useReducer } from 'react';
import { UserContextType, UserReducerAction, UserState } from '../types/user';

export const UserContext = createContext<UserContextType>({ state: null, dispatch: () => {} });

function userReducer(state: UserState, action: UserReducerAction): UserState {
    switch (action.type) {
        case 'login': {
            if (!action.payload)
                throw new Error();

            const { access_token } = action.payload;
            localStorage.setItem('access_token', access_token);

            console.log(action.payload)

            return action.payload;
        } break;
        case 'logout': {
            return null;
        } break;
        default:
            return state;
    }
}

export default function UserProvider(
    { children }:
    { children: React.ReactNode }
) {
    const [state, dispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            { children }
        </UserContext.Provider>
    );
}