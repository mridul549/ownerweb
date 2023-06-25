import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ background: "#004932" }} position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        FlavR
                    </Typography>
                    <Link to={'/login'}>
                        <Button
                            className="login"
                            sx={{
                                margin: "10px",
                                background: "#000", 
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
                                    background: "#000",
                                    color: "#fff",
                                },
                            }}
                            variant="outlined"
                            color="inherit"
                        >
                            SignUp
                        </Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
