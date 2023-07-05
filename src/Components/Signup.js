import {React, useState, useContext} from "react";
import '../css/auth.css'
import {Link, useNavigate} from 'react-router-dom'
import Spinner from "./Spinner";
import AuthContext from "../context/auth/authContext";
import imageSignup from '../images/Scene-43.jpg'

const Signup = () => {
    const [credentials, setCredentials] = useState({ownerName:'',email: '', password: '',cpassword:''})
    const [error, setError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [invalidCredError, setInvalidCredError] = useState({error: false, message: ''})
    const [loading, setLoading] = useState(false)
    const auth = useContext(AuthContext)
    let navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(credentials.ownerName.length===0 || credentials.email.length===0 || 
           credentials.password.length===0 || credentials.cpassword.length===0){

            if(credentials.cpassword!==credentials.password){
                setPassError(true)
            } else {
                setError(true)
            }
            return
        }

        setLoading(true)
        setInvalidCredError({error: false})
        const {ownerName,email,password}=credentials;
        const response = await fetch("https://flavr.tech/owner/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(({ownerName,email,password}))
        })
        const json = await response.json()
        setLoading(false)
        if(json.action==="Owner created and OTP Sent"){
            auth.setEmail(credentials.email)
            navigate('/otp')
        } else {
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
        if(e.target.name==="cpassword" && 
            (credentials.cpassword!==credentials.password || 
             credentials.cpassword.length>=credentials.password.length)){
            setPassError(true)
        } else {
            setPassError(false)
        }
    }

    return (
        <div className="container-fluid signup">
            <div className="row">
                <div className="col-lg-8 imgCol">
                    <img src={imageSignup} alt="abc" className="img-fluid image-1" />
                </div>
                <div className="col-lg-4 form-div">
                <h1 className="signup-head">FlavR</h1>
                    <h3>Sign Up</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <input className="input-field shadow-sm" type="text" onChange={onChange} name="ownerName" placeholder="Enter your name" />
                            { error&&credentials.ownerName.length===0 ? <label htmlFor="" className="errorLabel">Name can't be empty</label> : "" }
                        </div>
                        <div>
                            <input className="input-field shadow-sm" type="email" onChange={onChange} name="email" placeholder="Enter your email" />
                            { error&&credentials.email.length===0 ? <label htmlFor="" className="errorLabel">Email can't be empty</label> : "" }
                        </div>
                        <div>
                            <input className="input-field shadow-sm" type="password" onChange={onChange} name="password" placeholder="Enter your password" />
                            { error&&credentials.password.length===0 ? <label htmlFor="" className="errorLabel">Password can't be empty</label> : "" }
                        </div>
                        <div>
                            <input className="input-field shadow-sm" type="password" onChange={onChange} name="cpassword" placeholder="Confirm password" />
                            { error&&credentials.cpassword.length===0 ? <label htmlFor="" className="errorLabel">Confirm password can't be empty</label> : "" }
                            { passError&&(credentials.cpassword!==credentials.password)? 
                                <label htmlFor="" className="errorLabel">Passwords do not match</label> : "" }
                        </div>
                        {loading && <Spinner />}
                        <div className="sign-up-div"> <button type="submit" className="btn signup-btn">Sign Up</button></div>
                        {invalidCredError.error ? <label htmlFor="" style={{marginTop: "10px"}} className="errorLabel">{invalidCredError.message}</label> : ""}
                    </form>
                    <p>or</p>
                    <div className="google-div"><button className="btn google-btn">Continue with <i className="fa-brands fa-google"></i></button></div>
                    <Link to="/login" className="login-link">Already have an account? Log in here</Link>
                    </div>
            </div>
        </div>
    )
}

export default Signup