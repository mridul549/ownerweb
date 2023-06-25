import { React, useContext, useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import '../css/otp.css'
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const [otp, setOtp] = useState("");
    const {email} = useContext(AuthContext)
    const navigate = useNavigate()
    const[counter,setCounter]=useState(120);
    useEffect(() => {
        const timer = counter>0&&setInterval(() => setCounter(counter-1), 1000);
        return () =>clearInterval(timer);
    },[counter]);

    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    const handleOTP = async () => {
        const response = await fetch("https://flavr.tech/mail/verifyotp", {
            key:email,
            otp:otp,
            role:1
        })
        const json = await response.json()
        if(json.message==="OTP Verified, you can log in now.")
        {
            navigate('/');
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
            {counter>0? <p>resend OTP in 0{Math.floor(counter/60)}:{counter%60}</p>:""}
          <button onClick={handleOTP} className="btn btn-primary submitBtn">Submit OTP</button>
        </div>
    );
};

export default Otp;
