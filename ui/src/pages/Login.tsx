import React from "react";
import axios from 'axios';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { getError } from '../components/ErrorHelper';
import accountAtom, { IAccountData } from '../data/accountData';
import jwt from 'jsonwebtoken';
import Input from "../components/Input";
import Button from "../components/Button";
import AuthHolder from "../components/AuthHolder";
import { API_URL } from "../config";

interface ILoginData {
    email:string;
    password:string;
}


function Login() {

    const {register, errors, handleSubmit} = useForm<ILoginData>();
    const [error, setError] = React.useState<string>('');
    const history = useHistory();
    const [accountData, setAccountData] = useAtom(accountAtom);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(()=>{
        if(accountData.loggedIn) {
            history.push("/");
        }
        setLoading(false);
    },[])

    const doLogin = async (data:ILoginData) => {
        try {
            let res:any = await axios.post(`${API_URL}/accounts/authenticate`, data);
            let decoded:any = jwt.decode(res['data']['authToken'], {json: true});
            setError("");
            let tempAccount: IAccountData = {
                user: decoded['user'],
                customer: decoded['customer'],
                email: decoded['email'],
                isAdmin: decoded['is_admin'],
                isVerified: decoded['is_verified'],
                loggedIn: true
            }
            localStorage.setItem("user", decoded['user']);
            localStorage.setItem("customer", decoded['customer']);
            localStorage.setItem("auth", res['data']['authToken'])
            setAccountData(tempAccount);
            history.push("/boards")
        } catch(err) {
            console.log(err)
            setError("User Doesnot Exist"); 
        }
    }

    if(loading) return <div>Loading...</div>

    return (
        <AuthHolder>
            <form onSubmit={handleSubmit(doLogin)}>
                <label htmlFor="login-email-input" id="login-email-label">Email Address</label>
                <Input name="email" id="login-email-input" ref={register({ required:true, maxLength:50, pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} type="email" placeholder="Enter Email Address" error={errors.email?getError(errors.email.type):null}/>
                <br/>
                <label htmlFor="login-password-input" id="login-password-label">Password</label>
                <Input name="password" id="login-password-input" ref={register({ required: true })} type="password" placeholder="Enter Password" error={errors.password?getError(errors.password.type):null}/>
                <p className="text-center text-red-600">{error}</p><br/>
                <Button id="login-button" type="submit">Login</Button>
                <br /><br/>
                <p className="text-center text-blue-700"><Link to="/auth/register">Don't have an account get started</Link></p>
            </form>
        </AuthHolder>
    )
}

export default Login;
