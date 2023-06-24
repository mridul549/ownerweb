import * as React from "react";

function Login() {
    return (
        <div className="container-fluid signup">
                <div className="col-lg-4 form-div">
                <h1 className="signup-head">FlavR</h1>
                    <h3>Sign Up</h3>
                    <form action="">
                        <div className="input-field"><input type="text" placeholder="Enter your name" /></div>
                        <div className="input-field"><input type="email" placeholder="Enter your email" /></div>
                        <div className="input-field"><input type="password" placeholder="Enter your password" /></div>
                        <div className="input-field"> <input type="password" placeholder="Confirm password" /></div>
                        <div className="sign-up-div"> <button type="button" class="btn signup-btn">Sign Up</button></div>
                    </form>
                    <p>or</p>
                    <div className="google-div"><button class="btn google-btn">Continue with <i class="fa-brands fa-google"></i></button></div>
                    <a href="/" className="login-link">Already have an account? Log in here</a>
                    </div>
                    <div className="row">
                <div className="col-lg-8 imgCol">
                    <img src="https://i.imgur.com/bAaPDCL.jpg" alt="abc" className="img-fluid image-1" />
                </div>
            </div>
        </div>
    )
}

export default Login;