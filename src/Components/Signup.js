import {React, useState} from "react";
import '../css/auth.css'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [credentials, setCredentials] = useState({ownerName:'',email: '', password: '',cpassword:''})
    let navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        
        const {ownerName,email,password}=credentials;
        const response = await fetch("https://flavr.tech/owner/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(({ownerName,email,password}))
        })
        const json = await response.json()

        if(json.action==="Owner created and OTP Sent"){
            // save token and redirect to dashboard
            navigate('/otp')
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
                <div className="col-lg-8 imgCol">
                    <img src="https://i.imgur.com/bAaPDCL.jpg" alt="abc" className="img-fluid image-1" />
                </div>
                <div className="col-lg-4 form-div">
                <h1 className="signup-head">FlavR</h1>
                    <h3>Sign Up</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div><input className="input-field shadow-sm" type="text" onChange={onChange} name="ownerName" placeholder="Enter your name" /></div>
                        <div><input className="input-field shadow-sm" type="email" onChange={onChange} name="email" placeholder="Enter your email" /></div>
                        <div><input className="input-field shadow-sm" type="password" onChange={onChange} name="password" placeholder="Enter your password" /></div>
                        <div><input className="input-field shadow-sm" type="password" onChange={onChange} name="cpassword" placeholder="Confirm password" /></div>
                        <div className="sign-up-div"> <button type="submit" class="btn signup-btn">Sign Up</button></div>
                    </form>
                    <p>or</p>
                    <div className="google-div"><button class="btn google-btn">Continue with <i class="fa-brands fa-google"></i></button></div>
                    <Link to="/login" className="login-link">Already have an account? Log in here</Link>
                    </div>
            </div>
        </div>
    )
}

export default Signup