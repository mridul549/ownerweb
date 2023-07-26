import { React, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../css/auth.css'
import Spinner from "./Spinner";
import imageLogin from '../images/Scene-27.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import {Modal} from 'react-bootstrap'
import Otp from './Otp'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/auth/authContext";

export default function SignIn() {

    const [credentials, setCredentials] = useState({email: '', password: ''})
    const [error,setError]=useState(false);
    const [loading, setLoading] = useState(false)
    const [invalidCredError, setInvalidCredError] = useState({error: false, message: ''})
    const [verificationModal, setVerificationModal] = useState(false)
    const {setEmail,setOtpFor} = useContext(AuthContext)
    const [passRestModal, setPassResetModal] = useState(false)
    const [passResetForm, setPassResetForm] = useState({emailPass: ''})

    let navigate = useNavigate()

    const resetPassword = (event) => {
        event.preventDefault()

        toast.promise(
            fetch(`http://localhost:3001/mail/passwordreset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(({email: passResetForm.emailPass}))
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Please wait...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        setPassResetModal(false)
                        return data.message
                    },
                },
                error: {
                    render({ data }) {
                        return "Internal server error";
                    },
                }
            }
        );

    }

    const passOnChange = (e) => {
        setPassResetForm({...passResetForm, [e.target.name]: e.target.value})
    }

    const handleClosePassResetModal = () => {
        setPassResetModal(false)
    }

    const handleResetPassword = () => {
        setPassResetModal(true)
    }

    const handleCloseVerificationModal = () => {
        setVerificationModal(false)
    }

    const afterVerify = () => {
        setVerificationModal(false)
        toast.promise(
            fetch(`https://flavr.tech/owner/verifyowner`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email})
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Please wait while we verify your email...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        setVerificationModal(false)
                        return "Email verified successfully, you can log in now."
                    },
                },
                error: {
                    render({ data }) {
                        return "Internal server error";
                    },
                }
            }
        );
    }

    const sendOTP = async () => {
        toast.promise(
            fetch(`https://flavr.tech/mail/resendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(({key: credentials.email, role: 1}))
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Sending OTP to ${credentials.email}...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        setEmail(credentials.email)
                        setVerificationModal(true)
                        return data.message
                    },
                },
                error: {
                    render({ data }) {
                        return "Internal server error";
                    },
                }
            }
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setOtpFor('signup');
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
        setLoading(false)
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
            localStorage.setItem('loginMethod', 'regular')
            localStorage.setItem('ownerEmail', userProfileJson.owner[0].email)
            localStorage.setItem('ownerName', userProfileJson.owner[0].ownerName)
            localStorage.setItem('ownerProfilePic', userProfileJson.owner[0].ownerProfilePic.url)
            navigate('/dashboard/menu')
        }
        else if(json.message==='Email is not verified, please complete verification'){
            setOtpFor('verification')
            sendOTP()
        }
        else {
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
            localStorage.setItem('loginMethod', 'google')
            localStorage.setItem('token', json.token)
            localStorage.setItem('ownerEmail', decodedToken.email)
            localStorage.setItem('ownerName', decodedToken.name)
            localStorage.setItem('ownerProfilePic', decodedToken.picture)
            navigate('/dashboard/menu')
        } else {
            setInvalidCredError({error: true, message: json.message})
        }
    }

    useEffect(() =>{
        document.title = 'FlavR | Login'
    }, [])

    return (
        <>
            {/* Password reset modal */}
            <Modal show={passRestModal} onHide={handleClosePassResetModal} >
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Forgot Password</Modal.Title>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleClosePassResetModal}></button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        <form onSubmit={resetPassword}>
                            <div className="d-flex justify-content-center mt-3">
                                <p style={{textAlign: 'center'}}>Enter the email whose password you want to reset.</p>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-center" >
                                <input autoComplete='off' required type="email" name="emailPass" onChange={passOnChange} className="inputText shadow-sm" placeholder="Enter your email"/>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn saveChanges">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Email verification Modal */}
            <Modal show={verificationModal} onHide={handleCloseVerificationModal}>
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Verify Email</Modal.Title>
                        <h6 className='mt-3' style={{textAlign:'center'}}>Seems like your email has not been verified, please verify it below.</h6>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleCloseVerificationModal}></button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{marginTop: "-60px"}}>
                            <Otp afterVerify={afterVerify} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="container-fluid signup">
                <div className="row">
                    <div className="col-lg-4 form-div">
                        <div className=' d-flex justify-content-center'>
                            <img src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688365848/flavr_l4bspc.png" style={{width: "100px"}} alt="" />
                        </div>
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
                        <p className='mt-3'>or</p>
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
                        <div className='mt-3'>
                            <button onClick={handleResetPassword} className='forgotPassword'>Forgot Password</button>
                            <br/>
                            <Link to="/signup" className="login-link">Don't have an account? Sign Up here</Link>
                        </div>
                    </div>
                    <div className="col-lg-8 imgCol">
                        <img src={imageLogin} alt="abc" className="img-fluid image-1" />
                    </div>
                </div>
            </div>
        </>
    );
}