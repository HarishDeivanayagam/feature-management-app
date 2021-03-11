import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import AuthHolder from "../components/AuthHolder";
import Button from "../components/Button";
import Input from "../components/Input";
import { getError } from '../components/ErrorHelper';
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../config";

interface ICreateData {
    company:string;
    user:string;
    email:string;
    password:string;
    cpassword: string;
}

function SignUp() {

    const {register, errors, handleSubmit} = useForm<ICreateData>();
    const [error, setError] = React.useState<string>('');
    const history = useHistory();

    const createAccount = async (data:ICreateData) => {
        try {
            if(data.password===data.cpassword) {
                let res:AxiosResponse = await axios.post(`${API_URL}/accounts`, data);
                setError("");
                history.push("/auth/login")        
            } else {
                setError("Passwords don't match");
                return;
            }
        } catch(err) {
            setError("Unable to create account"); 
            return;
        }
    }

    return (
        <AuthHolder>
            <form onSubmit={handleSubmit(createAccount)}>
                <label htmlFor="signup-company-input" id="signup-company-label">Company</label>
                <Input name="company" id="signup-company-input" ref={register({ required: true })} type="text" placeholder="Enter Company Name" error={errors.company?getError(errors.company.type):null}/>
                <br/>
                <label htmlFor="signup-user-input" id="signup-user-label">User</label>
                <Input name="user" id="signup-user-input" ref={register({ required: true })} type="text" placeholder="Enter Your Name" error={errors.user?getError(errors.user.type):null}/>
                <br/>
                <label htmlFor="signup-email-input" id="signup-email-label">Email Address</label>
                <Input name="email" id="signup-email-input" ref={register({ required:true, maxLength:50, pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} type="email" placeholder="Enter Email Address" error={errors.email?getError(errors.email.type):null}/>
                <br/>
                <label htmlFor="signup-password-input" id="signup-password-label">Password</label>
                <Input name="password" id="signup-password-input" ref={register({ required: true })} type="password" placeholder="Enter Password" error={errors.password?getError(errors.password.type):null}/>
                <br/>
                <label htmlFor="signup-cpassword-input" id="signup-cpassword-label">Password</label>
                <Input name="cpassword" id="signup-cpassword-input" ref={register({ required: true })} type="password" placeholder="Confirm Password" error={errors.password?getError(errors.password.type):null}/>
                <br/>
                <p className="text-center text-red-600">{error}</p><br/>
                <Button id="signup-button" type="submit">Create Account</Button>
                <br /><br/>
                <p className="text-center text-blue-700"><Link to="/auth/login">Have an account? Login Here</Link></p>
            </form>
        </AuthHolder>
    )
}

export default SignUp;