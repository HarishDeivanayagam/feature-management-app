import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useAtom } from 'jotai';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { getError } from '../components/ErrorHelper';
import InfoSplit from '../components/InfoSplit/InfoSplit';
import accountAtom, { IAccountData } from '../data/accountData';
import styles from './Page.module.css';
import jwt from 'jsonwebtoken';

interface ILoginData {
    email:string;
    password:string;
}

function Login() {

    const {register, errors, handleSubmit} = useForm<ILoginData>();
    const [error, setError] = React.useState<string>('');
    const history = useHistory();
    const [, setAccountData] = useAtom(accountAtom);

    const doLogin = async (data:ILoginData) => {
        try {
            let res:any = await axios.post(`${process.env["REACT_APP_API"]}/accounts/authenticate`, data);
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
    return (
        <InfoSplit>
            <form className={styles.loginForm} onSubmit={handleSubmit(doLogin)}>
                <h1 className={styles.center}>Login</h1><br/><br/>
                <TextField error={errors.email?true:false} helperText={errors.email?getError(errors.email.type):null} name="email" inputRef={register({ required:true, maxLength:50, pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} id="email-input" type="email" fullWidth={true} label="Email Address" variant="outlined" /><br/><br/>
                <TextField error={errors.password?true:false} helperText={errors.password?getError(errors.password.type):null} name="password" inputRef={register({ required: true })} id="password-input" type="password" fullWidth={true} label="Password" variant="outlined" /><br/><br/>
                <p className={styles.error}>{error}</p><br/>
                <Button type="submit" size="large" variant="contained" color="primary" fullWidth={true} disableElevation>Login</Button>
                <br /><br/>
                <p className={styles.center}><Link to="/auth/register">Don't have an account get started</Link></p>
            </form>
        </InfoSplit>
    )
}

export default Login;