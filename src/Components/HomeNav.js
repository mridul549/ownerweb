import {React, useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

export default function ButtonAppBar() {
    const { authenticated } = useContext(AuthContext)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ background: "#004932", boxShadow: 0, height: "3rem" }} position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        FlavR
                    </Typography>
                    {!authenticated ? 
                        <div className="auth">
                            <Link to={'/login'}>
                                <Button
                                    className="login"
                                    sx={{
                                        margin: "10px",
                                        background: "#004932", 
                                        color: "#fff",
                                        ":hover": {
                                            background: "#fff",
                                            color: "#000",
                                        },
                                    }}
                                    variant="outlined"
                                    color="inherit"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button
                                    className="signup"
                                    sx={{ 
                                        background: "#fff", 
                                        color: "#000",
                                        ":hover": {
                                            background: "#004932",
                                            color: "#fff",
                                        },
                                    }}
                                    variant="outlined"
                                    color="inherit"
                                >
                                    SignUp
                                </Button>
                            </Link>
                        </div> : 
                        <button className="btn btn-primary">Hi</button>
                    }   
                </Toolbar>
            </AppBar>
        </Box>
    );
}
