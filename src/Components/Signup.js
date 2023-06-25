import * as React from "react";
import '../css/auth.css'
import {Link} from 'react-router-dom'
function Signup() {
    return (
        <div className="container-fluid signup">
            <div className="row">
                <div className="col-lg-8 imgCol">
                    <img src="https://i.imgur.com/bAaPDCL.jpg" alt="abc" className="img-fluid image-1" />
                </div>
                <div className="col-lg-4 form-div">
                <h1 className="signup-head">FlavR</h1>
                    <h3>Sign Up</h3>
                    <form action="">
                        <div><input className="input-field shadow-sm" type="text" placeholder="Enter your name" /></div>
                        <div><input className="input-field shadow-sm" type="email" placeholder="Enter your email" /></div>
                        <div><input className="input-field shadow-sm" type="password" placeholder="Enter your password" /></div>
                        <div> <input className="input-field shadow-sm" type="password" placeholder="Confirm password" /></div>
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