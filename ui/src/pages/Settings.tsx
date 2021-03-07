import React from "react";
import AppContainer from "../components/AppContainer";
import accountAtom, { initialAccountState } from "../data/accountData";
import {deleteTokens, getToken} from "../metal/auth";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getError } from "../components/ErrorHelper";
import { useAtom } from "jotai";
import Button from "../components/Button";
import { API_URL } from "../config";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { useAlert } from "react-alert";

interface INewUser {
    name:string;
    email:string;
    password:string;
    isAdmin:any;
}


function Settings() {

    const [accountData, setAccountData] = useAtom(accountAtom);
    const [myUsers, setMyUsers] = React.useState([]);
    const history = useHistory();
    const [open, setOpen] = React.useState<boolean>(false);
    const {register, errors, handleSubmit} = useForm<INewUser>();
    const alert = useAlert();

    const fetchMyUsers = async () => {
        let res = await axios.get(`${API_URL}/accounts/users`, {headers: getToken()})
        setMyUsers(res.data);
    }

    React.useEffect(()=>{
        if(accountData.isAdmin) {
            fetchMyUsers();
        }
    },[])

    const logOut = () => {
        deleteTokens();
        setAccountData(initialAccountState);
        history.push("/auth/login");
    }

    const createNewUser = async (data:INewUser) => {
        if(data['isAdmin'].length===0) {
            data['isAdmin'] = false;
        }
        if(data['isAdmin'][0]==='on') {
            data['isAdmin'] = true;
        }
        try {
            let res:any = await axios.post(`${API_URL}/accounts/users`, data, {headers: getToken()});
            let temp:any = [...myUsers];
            temp.push(res.data);
            setMyUsers(temp);
            setOpen(false);
            alert.success("User added");
        } catch(err) {
            console.log(err);
            alert.error("Unable to add user");
        }
    }



    return (
        <AppContainer path="/settings">
            {open?<Modal>
                <form name="create-user-form" onSubmit={handleSubmit(createNewUser)}>
                    <p className="text-right text-red-700 cursor-pointer" onClick={()=>{setOpen(false)}}>Close</p>
                    <label htmlFor="adduser-name-input" id="adduser-name-label">Name</label>
                    <Input name="name" id="adduser-name-input" ref={register({ required:true, maxLength:20})} type="text" placeholder="Enter UserName" error={errors.email?getError(errors.email.type):null}/>
                    <br/>
                    <label htmlFor="adduser-email-input" id="adduser-email-label">Email Address</label>
                    <Input name="email" id="adduser-email-input" ref={register({ required:true, maxLength:50, pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} type="email" placeholder="Enter Email Address" error={errors.email?getError(errors.email.type):null}/>
                    <br/>
                    <label htmlFor="adduser-password-input" id="adduser-password-label">Password</label>
                    <Input name="password" id="adduser-password-input" ref={register({ required:true, maxLength:80, minLength:3 })} type="password" placeholder="Enter Password" error={errors.password?getError(errors.password.type):null}/>
                    <div className="mt-3 mb-3">
                        <input type="checkbox" name="isAdmin" ref={register}/><span> This is an admin user</span>
                    </div>
                    <Button id="adduser-button" type="submit">Create User</Button>
                </form>
            </Modal>:null}
            <div className="w-2/12">
                <h1 className="mb-1 text-2xl">Settings</h1>
                <span>----------------------------------</span><br/>
                <h2 className="mt-2 mb-4 text-xl">User Settings</h2>
                <p>User Name : {accountData.userName}</p><br/>
                <p>User Email : {accountData.email}</p><br/>
                <Button onClick={logOut} color="red">Logout</Button><br/>
                <span>----------------------------------</span><br/><br/>
                {accountData.isAdmin?
                    <div>
                        <h2 className="mb-2 text-xl">Admin Settings</h2>
                        <Button onClick={()=>{setOpen(true)}}>Add User</Button><br/><br/>
                        <p className="mb-4 text-lg">My Users</p>
                        {myUsers!==[]?myUsers.map((elm:any, index:any)=>{
                            return <div key={index}><a>{index+1}) {elm.name} - {elm.email}</a><span> </span><a className="text-blue-700 cursor-pointer">Edit</a><br/><br/></div>
                        }):null}
                    </div>
                :null}
            </div>
        </AppContainer>
    )
}

export default Settings;
