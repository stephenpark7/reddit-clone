import React from 'react';
import { UserData } from '../types/UserData';

export const DefaultUserState = {
    user_id: '',
    username: '',
    access_token: '',
};

export const UserContext = React.createContext({
    state: DefaultUserState,
    setState: (state: UserData) => {}
});
