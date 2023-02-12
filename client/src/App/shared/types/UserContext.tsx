import { UserData } from '../types/UserData';

export type UserContext = {
    state: UserData,
    setState: (state: UserData) => void
}
