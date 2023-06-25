import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../css/auth.css'

export default function SignIn() {

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
    <div className="container-fluid signup">
            <div className="row">
                <div className="col-lg-4 form-div">
                    <h1 className="signup-head">FlavR</h1>
                    <h3>Sign In</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div><input className="input-field shadow-sm" type="email" value={credentials.email} onChange={onChange} placeholder="Enter your email" /></div>
                        <div><input className="input-field shadow-sm" type="password" value={credentials.password} onChange={onChange} placeholder="Enter your password" /></div>
                        <div className="sign-up-div"> <button type="submit" class="btn signup-btn">Sign In</button></div>
                    </form>
                    <p>or</p>
                    <div className="google-div"><button class="btn google-btn">Continue with <i class="fa-brands fa-google"></i></button></div>
                    <Link to="/signup" className="login-link">Don't have an account? Sign Up here</Link>
                </div>
                <div className="col-lg-8 imgCol">
                    <img src="https://i.imgur.com/ytUITKx.jpg" alt="abc" className="img-fluid image-1" />
                </div>
            </div>
        </div>
  );
}
