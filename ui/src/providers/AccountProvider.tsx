import { useAtom } from "jotai";
import React from "react";
import accountAtom, { IAccountData } from '../data/accountData';
import jwt from 'jsonwebtoken';
import { deleteTokens } from "../metal/auth.metal";

function AccountProvider(props:any) {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [, setAccountData] = useAtom(accountAtom);

    const assignAccount = () => {
        let token = localStorage.getItem("auth");
        if(token) {
            let decoded:any = jwt.decode(token, {json: true});
            let tempAccount: IAccountData = {
                user: decoded['user'],
                customer: decoded['customer'],
                email: decoded['email'],
                isAdmin: decoded['is_admin'],
                isVerified: decoded['is_verified'],
                loggedIn: true
            }
            if(Date.now() >= decoded.exp * 1000) {
                deleteTokens();
            } else {
                setAccountData(tempAccount);
            }
        }
        setLoading(false);
    }
    
    React.useEffect(()=>{
        assignAccount();
    },[])

    if(loading) return <div>Loading...</div>

    return (
        <div>
            {props.children}
        </div>
    )
}

export default AccountProvider;