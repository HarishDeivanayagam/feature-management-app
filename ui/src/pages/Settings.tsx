import { Button, Checkbox, createMuiTheme, Divider, FormControlLabel, makeStyles, Modal, TextField, ThemeProvider } from "@material-ui/core";
import { useAtom } from "jotai";
import React from "react";
import AppContainer from "../components/AppContainer/AppContainer";
import accountAtom, { initialAccountState } from "../data/accountData";
import {deleteTokens, getToken} from "../metal/auth.metal";
import {useHistory} from "react-router-dom";
import { red } from '@material-ui/core/colors';
import axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from "react-hook-form";
import { getError } from "../components/ErrorHelper";

interface INewUser {
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
}


function Settings() {

    const [accountData, setAccountData] = useAtom(accountAtom);
    const [myUsers, setMyUsers] = React.useState([]);
    const history = useHistory();
    const [open, setOpen] = React.useState<boolean>(false);
    const {register, errors, handleSubmit} = useForm<INewUser>();

    const fetchMyUsers = async () => {
        let res = await axios.get(`${process.env["REACT_APP_API"]}/accounts/users`, {headers: getToken()})
        setMyUsers(res.data);
    }

    React.useEffect(()=>{
        if(accountData.isAdmin) {
            fetchMyUsers();
        }
    },[])

    const theme = createMuiTheme({
        palette: {
          primary: red,
        },
    });
    
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          outline: 'none'
        },
      }));

    const logOut = () => {
        deleteTokens();
        setAccountData(initialAccountState);
        history.push("/auth/login");
    }

    const createNewUser = async (data:INewUser) => {
        try {
            let res:any = await axios.post(`${process.env["REACT_APP_API"]}/accounts/users`, data, {headers: getToken()});
            let temp:any = [...myUsers];
            temp.push(res.data);
            setMyUsers(temp);
            setOpen(false);
        } catch(err) {
            console.log(err);
        }
    }

    const classes = useStyles();

    return (
        <AppContainer path="Settings">
            <Modal 
                open={open} 
                onClose={()=>{setOpen(false)}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                className={classes.modal}
                >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form onSubmit={handleSubmit(createNewUser)}>
                            <h2 id="transition-modal-title">Add User</h2><br/>
                            <TextField error={errors.name?true:false} helperText={errors.name?getError(errors.name.type):null} name="name" inputRef={register({ required:true, maxLength:50 })} id="createuser-name-input" type="name" fullWidth={true} label="User Name" variant="outlined" /><br/><br/>
                            <TextField error={errors.email?true:false} helperText={errors.email?getError(errors.email.type):null} name="email" inputRef={register({ required:true, maxLength:50, pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} id="createuser-email-input" type="email" fullWidth={true} label="Email Address" variant="outlined" /><br/><br/>
                            <TextField error={errors.password?true:false} helperText={errors.password?getError(errors.password.type):null} name="password" inputRef={register({ required: true })} id="createuser-password-input" type="password" fullWidth={true} label="Password" variant="outlined" /><br/><br/>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    id="password-input"
                                    inputRef={register()}
                                    name="isAdmin"
                                    color="primary"
                                />
                                }
                                label="Admin User"
                            />
                            <Button type="submit" size="large" variant="contained" color="primary" fullWidth={true} disableElevation>Create User</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>

            <h1>Settings</h1><br/><br/>
            <h2>User</h2><br/>
            <p>{accountData.email}</p><br/>
            <ThemeProvider theme={theme}>
                <Button onClick={logOut} variant="contained" color="primary" disableElevation>Logout</Button><br/><br/>
            </ThemeProvider>
            <Divider /><br/><br/>
            {accountData.isAdmin?
                <div>
                    <h2>Admin Settings</h2><br/>
                    <Button onClick={()=>{setOpen(true)}} variant="contained" color="primary" disableElevation>Add User</Button><br/><br/>
                    {myUsers!==[]?myUsers.map((elm:any, index:any)=>{
                        return <div key={index}><a>{elm.name} - {elm.email}</a><span> </span><a>Edit</a></div>
                    }):null}
                </div>
            :null}
        </AppContainer>
    )
}

export default Settings;
