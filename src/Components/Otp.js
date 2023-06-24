import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Box from "@mui/material/Box";

const Otp = () => {
    const [otp, setOtp] = React.useState("");

    const handleChange = (newValue) => {
        setOtp(newValue);
    };
    console.log(otp);
    return (
        <MuiOtpInput value={otp} style={{width: "400px", fontSize: "20px"}} onChange={handleChange} />
    );
};

export default Otp;
