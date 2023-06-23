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
        <Box
            sx={{
                width: 300,
                height: 300,
                backgroundColor: "primary.dark",
                "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <MuiOtpInput value={otp} style={{width: "400px", fontSize: "20px"}} onChange={handleChange} />
        </Box>
    );
};

export default Otp;
