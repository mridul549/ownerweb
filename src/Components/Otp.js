import { React, useContext, useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import '../css/otp.css'
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Otp = () => {
    const [otp, setOtp] = useState("");
    const {email,setAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()
    const [counter, setCounter]=useState(120);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({error: false, message: ''})

    useEffect(() => {
        const timer = counter>0&&setInterval(() => setCounter(counter-1), 1000);
        return () =>clearInterval(timer);
    },[counter]);

    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    const handleOTP = async () => {
        setLoading(true)
        const response = await fetch("https://flavr.tech/mail/verifyotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(({key: email, otp: parseInt(otp), role: 1}))
        })
        const json = await response.json()
        setLoading(false)
        if(json.message==="OTP Verified, you can log in now.") {
            setAuthenticated(true)
            navigate('/');
        } else {
            setError({error: true, message: json.message})
        }
    } 

    const handleReSend = async () => {
        const response = await fetch("https://flavr.tech/mail/resendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(({key: email, role: 1}))
        })
        const json = await response.json()
        if(json.action==="OTP Sent") {
            setError({error: true, message: json.action + json.message})
            setTimeout(() => {
                setError({error: false, message: ''})
            }, 5000)
        } else {
            setError({error: true, message: json.message})
        }
    }

    return (
        <div className="container-fluid otpContainer">
            <h1>OTP Verification</h1>
            <div className="container sentContainer">
                <p style={{fontWeight: 600}}>A One time password has been sent to the email</p>
                <p style={{fontWeight: 600, marginTop: -6}}>{email}</p>
            </div>
            <div className="otp">
                <MuiOtpInput value={otp} onChange={handleChange} />
            </div>
            {loading && <Spinner />}
            {error.error ? <label className="errorLabel">{error.message}</label> : ""} 
            {
                counter>0 ? 
                <button disabled={counter>0 } className="btn resendLink">resend OTP in 0{Math.floor(counter/60)}:{counter%60}</button> : 
                <button className="btn resendLink" onClick={handleReSend}>resend OTP</button>
            }
          <button onClick={handleOTP} className="btn submitBtn">Submit OTP</button>
        </div>
    );
};

export default Otp;