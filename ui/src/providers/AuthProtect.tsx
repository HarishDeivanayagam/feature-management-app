import { useAtom } from "jotai";
import React from "react";
import accountAtom, { IAccountData } from "../data/accountData";

function AuthProtect(props:any) {

    const [accountData] = useAtom<IAccountData>(accountAtom);
    const [loading, setLoading] = React.useState<boolean>(true);
    
    React.useEffect(()=>{
        if(!accountData.loggedIn) {
            window.location.href = "/auth/login"
        } else {
            setLoading(false);
        }
    },[])

    if(loading) return <div>Loading...</div>

    return (
        <div>{props.children}</div>
    )
}

export default AuthProtect;
