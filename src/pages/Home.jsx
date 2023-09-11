import { Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Home.css";
import { logout } from "../redux/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className="nav-bar">
                <a href="/">
                    <Button size="small" variant="outlined" style={{ margin: "0.4rem 0.2rem" }} onClick={() => {
                        navigate("/");
                    }}>Home</Button>
                </a>
                <Button size="small" variant="outlined" style={{ margin: "0.4rem 0.2rem" }} color="error" onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                }}>Logout</Button>
            </div>

            <Outlet />
        </>
    )
}

export default Home;
