import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://flavr.tech">
        FlavR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    const [credentials, setCredentials] = useState({email: '', password: ''})
    let navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        const response = await fetch("https://flavr.tech/owner/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(({email: credentials.email, password: credentials.password}))
        })
        const json = await response.json()

        if(json.message==="Auth successful"){
            // save token and redirect to dashboard
            localStorage.setItem('token', json.token)
            navigate('/')
        } else {
            alert("Invalid credentials")
        }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#000' }}>
              <LockOutlinedIcon sx={{background: "#000"}} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, textAlign: 'center' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={credentials.email}
                label="Email Address"
                onChange={onChange}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={credentials.password}
                onChange={onChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: -1, width: "40vh", bgcolor: "#000", color: "#fff", ":hover": { bgcolor: "#fff", color: "#000", borderColor: "#000"  } }}
              >
                Sign In
              </Button>
              <p style={{color: "#000", textAlign: 'center'}}>Or</p>
              <Button
                variant="outlined"
                sx={{ mt: -1, mb: 2, width: "40vh", bgcolor: "#000", color: "#fff", ":hover": { bgcolor: "#fff", color: "#000", borderColor: "#000" } }}
                endIcon={<GoogleIcon />}
              >
                Continue with
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{fontSize: 15}}>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}