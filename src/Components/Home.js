import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import '../css/home.css'

export default function Home() {

    useEffect(() => {
        localStorage.setItem('token', '')
        localStorage.setItem('selectedOutlet', '')
        localStorage.setItem('ownerEmail', '')
        localStorage.setItem('ownerName', '')
        localStorage.setItem('ownerProfilePic', '')
    }, [])

    return (
        <>
            <div className="bg blur d-flex flex-column justify-content-center align-items-center">
                <div className="glass my-4">
                    <div>
                        <img className="logo" src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688370279/flavr_1_paytzh.png"  alt="" />
                    </div>
                    <Link to={'/login'}>
                        <button className="btn authBtn mx-2" style={{marginTop: "10px"}}>Log in</button>
                    </Link>
                    <Link to={'/signup'}>
                        <button className="btn authBtn mx-2" style={{marginTop: "10px"}}>Sign up</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
