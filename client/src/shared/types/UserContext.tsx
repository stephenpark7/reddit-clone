import { TUserData } from '../types/UserData';

export type TUserContext = {
    state: TUserData,
    setState: (state: TUserData) => {}
}