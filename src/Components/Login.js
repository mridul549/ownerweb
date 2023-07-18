import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../css/auth.css'
import Spinner from "./Spinner";
import imageLogin from '../images/Scene-27.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

export default function SignIn() {

    const [credentials, setCredentials] = useState({email: '', password: ''})
    const [error,setError]=useState(false);
    const [loading, setLoading] = useState(false)
    const [invalidCredError, setInvalidCredError] = useState({error: false, message: ''})
    let navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        if(credentials.email.length===0||credentials.password.length===0){
            setError(true);
            return;
        }
        setLoading(true);
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
            const userProfile = await fetch(`https://flavr.tech/owner/ownerprofile?ownermail=${credentials.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            const userProfileJson = await userProfile.json()

            localStorage.setItem('ownerEmail', userProfileJson.owner[0].email)
            localStorage.setItem('ownerName', userProfileJson.owner[0].ownerName)
            localStorage.setItem('ownerProfilePic', userProfileJson.owner[0].ownerProfilePic.url)
            setLoading(false)
            navigate('/dashboard/menu')
        } else {
            setLoading(false)
            if(json.message!==undefined && json.message!==null){
                setInvalidCredError({error: true, message: json.message})
            } else {
                setInvalidCredError({error: true, message: "Internal Server error"})
            }
        }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
        setInvalidCredError({error: false, message: ''})
    }

    const handleGoogleAuth = async (res) => {
        const decodedToken = jwt_decode(res.credential)

        const response = await fetch("https://flavr.tech/owner/googleAuth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ownerName: decodedToken.name, email: decodedToken.email, profileUrl: decodedToken.picture})
        })
        const json = await response.json()

        if(json.message === "Auth successful"){
            localStorage.setItem('token', json.token)
            localStorage.setItem('ownerEmail', decodedToken.email)
            localStorage.setItem('ownerName', decodedToken.name)
            localStorage.setItem('ownerProfilePic', decodedToken.picture)
            navigate('/dashboard/menu')
        } else {
            setInvalidCredError({error: true, message: json.message})
        }
    }

    return (
        <div className="container-fluid signup">
            <div className="row">
                <div className="col-lg-4 form-div">
                    <h1 className="signup-head">FlavR</h1>
                    <h3>Sign In</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <input className="input-field shadow-sm" name='email' type="email" value={credentials.email} onChange={onChange} placeholder="Enter your email" />
                            { error&&credentials.email.length===0 ? <label htmlFor="" className="errorLabel">Email can't be empty</label> : "" }
                        </div>
                        <div>
                            <input className="input-field shadow-sm" name='password' type="password" value={credentials.password} onChange={onChange} placeholder="Enter your password" />
                            { error&&credentials.password.length===0 ? <label htmlFor="" className="errorLabel">Password can't be empty</label> : "" }
                        </div>
                        {loading && <Spinner />}
                        <div className="sign-up-div"> <button type="submit" className="btn signup-btn">Sign In</button></div>
                        {invalidCredError.error ? <label htmlFor="" style={{marginTop: "10px"}} className="errorLabel">{invalidCredError.message}</label> : ""}
                    </form>
                    <p>or</p>
                    <div id='googleAuth' className="google-div d-flex justify-content-center">
                        <GoogleOAuthProvider clientId='605715529434-5a45tj90r7kjqmuvmffg526tfiuqfv74.apps.googleusercontent.com'>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    handleGoogleAuth(credentialResponse)
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <Link to="/signup" className="login-link">Don't have an account? Sign Up here</Link>
                </div>
                <div className="col-lg-8 imgCol">
                    <img src={imageLogin} alt="abc" className="img-fluid image-1" />
                </div>
            </div>
        </div>
    );
}