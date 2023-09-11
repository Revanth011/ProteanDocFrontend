import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import "./styles/Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from "../../../redux/auth"

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, credentials)
            .then(response => {
                if (response.data.accessToken) {
                    dispatch(login(response.data));
                    navigate("/");
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="login">
                <div className="login-main">
                    <div className="" style={{ margin: "1rem 0" }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField label="UserName" variant="standard" required onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
                        </Box>
                    </div>
                    <div className="">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField label="Password" variant="standard" type={"password"} required onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                        </Box>
                    </div>
                    <Button variant="contained" required size="small" style={{ margin: "1rem 0" }} type={"submit"}>Login</Button>
                </div>
            </div>
        </form>
    )
}

export default Login;
