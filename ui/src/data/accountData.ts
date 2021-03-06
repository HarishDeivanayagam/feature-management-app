import { atom } from 'jotai'

export interface IAccountData {
    user: string;
    userName:string;
    tenant: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    loggedIn: boolean;
}

export const initialAccountState: IAccountData = {
    user: "",
    userName:"",
    tenant: "",
    email: "",
    isVerified: false,
    isAdmin: false,
    loggedIn: false
}

const accountAtom = atom<IAccountData>(initialAccountState);

export default accountAtom;
