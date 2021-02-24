import { atom } from 'jotai'

export interface IAccountData {
    user: string;
    customer: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    loggedIn: boolean;
}

export const initialState: IAccountData = {
    user: "",
    customer: "",
    email: "",
    isVerified: false,
    isAdmin: false,
    loggedIn: false
}

const accountAtom = atom<IAccountData>(initialState);

export default accountAtom;
