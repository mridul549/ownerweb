import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

import { useState } from "react";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://flavr.tech">
                Flavr
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        const response = await fetch("https://flavr.tech/owner/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();

        if (json.message === "Auth successful") {
            // save token and redirect to dashboard
            localStorage.setItem("token", json.token);
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#000" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, textAlign: 'center' }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="ownerName"
                            value={credentials.email}
                            label="Name"
                            name="name"
                            onChange={onChange}
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={credentials.email}
                            label="Email Address"
                            name="email"
                            onChange={onChange}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={onChange}
                            value={credentials.password}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{
                                mt: 3,
                                mb: -1,
                                width: "40vh",
                                bgcolor: "#000",
                                color: "#fff",
                                ":hover": {
                                    bgcolor: "#fff",
                                    color: "#000",
                                    borderColor: "#000",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <p style={{ color: "#000", textAlign: "center" }}>Or</p>
                        <Button
                            variant="outlined"
                            sx={{
                                mt: -1,
                                mb: 2,
                                width: "40vh",
                                bgcolor: "#000",
                                color: "#fff",
                                ":hover": {
                                    bgcolor: "#fff",
                                    color: "#000",
                                    borderColor: "#000",
                                },
                            }}
                            endIcon={<GoogleIcon />}
                        >
                            Continue with
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
