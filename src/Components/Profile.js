import {React, useState, useRef, useEffect, useContext} from "react";
import '../css/profile.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import verifiedIcon from '../images/verified-icon.gif'
import {Modal} from 'react-bootstrap'
import AuthContext from "../context/auth/authContext";
import Otp from '../Components/Otp'

export default function Profile() {
    const inputRef = useRef(null)
    const [ownerForm, setOwnerForm] = useState({ownerName: '', email: '', profilePic: null})
    const [image, setImage] = useState('')
    const [beforeEditOwner, setBeforeEditOwner] = useState({ownerName: '', email: ''})
    const [emailVerifiedModal, setEmailVerifiedModal] = useState({state: false, method: ''})
    const [passRestModal, setPassResetModal] = useState(false)
    const [passResetForm, setPassResetForm] = useState({oldPass: '', newPass: '', confirmNewPass: ''})
    const [passError, setPassError] = useState(false)
    const {setEmail,setOtpFor} = useContext(AuthContext)
    
    const resetPassword = () => {
        console.log(passResetForm.oldPass + " " + passResetForm.newPass);
        toast.promise(
            fetch(`https://flavr.tech/owner/resetpassword`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(({oldPassword: passResetForm.oldPass, newPassword: passResetForm.newPass}))
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
        if(e.target.name==="confirmNewPass" && 
            (passResetForm.confirmNewPass!==passResetForm.newPass || 
             passResetForm.confirmNewPass.length>=passResetForm.newPass.length)){
            setPassError(true)
        } else {
            setPassError(false)
        }
    }

    const handleClosePassResetModal = () => {
        setPassResetModal(false)
    }

    const handleResetPassword = () => {
        setEmailVerifiedModal({...emailVerifiedModal, method: "pass"})
        handleVerifyEmail()
    }

    const handleCloseEmailVerifiedModal = () => {
        setEmailVerifiedModal({state: false})
    }

    const afterVerify = async () => {
        setBeforeEditOwner({ownerName: ownerForm.ownerName, email: ownerForm.email});
        setOtpFor('signup');
        setEmailVerifiedModal({...emailVerifiedModal, state: false});
        if(emailVerifiedModal.method==="email"){
            handleProfileFormWithoutCheck()
        } else {
            console.log("to reset");
            setPassResetModal(true)
        }
    };

    const handleVerifyEmail = async () => {
        setOtpFor('profile')

        toast.promise(
            fetch(`https://flavr.tech/mail/resendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(({key: ownerForm.email, role: 1}))
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Sending OTP to ${ownerForm.email}...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        setEmail(ownerForm.email)
                        setEmailVerifiedModal({...emailVerifiedModal, state: true})
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

    const handleProfileFormWithoutCheck = async () => {
        toast.promise(
            fetch("https://flavr.tech/owner/updateowner/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ownerName: ownerForm.ownerName, email: ownerForm.email})
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return "Please wait while we update your profile...";
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        localStorage.setItem('ownerEmail', ownerForm.email)
                        localStorage.setItem('ownerName', ownerForm.ownerName)
                        setEmailVerifiedModal({state: false, method: ''})
                        setTimeout(() => {
                            window.location.reload();
                        },2000)
                        return data.message;
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

    const handleProfileFormWithCheck = async () => {
        if(ownerForm.email!==beforeEditOwner.email) {
            toast.promise(
                fetch(`https://flavr.tech/owner/ownerprofile?ownermail=${ownerForm.email}`, {
                    method: "GET",
                }).then((response) => response.json()),
                {
                    pending: {
                        render() {
                            return "Finding if email already exits...";
                        },
                        icon: true,
                    },
                    success: {
                        render({ data }) {
                            if(data.error === "Owner not found"){
                                setEmailVerifiedModal({...emailVerifiedModal, method: 'email'})
                                handleVerifyEmail()
                                return "Email not found"
                            } else {
                                return "Email already exits"
                            }
                        },
                    },
                    error: {
                        render({ data }) {
                            return "Internal server error";
                        },
                    }
                }
            );
            return
        }
        handleProfileFormWithoutCheck()
    }

    const handleImageUpload = async () => {
        const imageForm = new FormData()
        imageForm.append('newOwnerImage', image)
        
        toast.promise(
            fetch("https://flavr.tech/owner/updateImage/", {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: imageForm
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return "Please wait...";
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        localStorage.setItem('ownerProfilePic', data.url)
                        setTimeout(() => {
                            window.location.reload();
                        },3000)
                        return data.message;
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

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const ownerFormOnChange = (e) => {
        if (e.target.name === "ownerImageInput") {
            setImage(e.target.files[0])
            setOwnerForm({ ...ownerForm, productImage: e.target.files[0] });
        } else {
            setOwnerForm({ ...ownerForm, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        setImage(localStorage.getItem('ownerProfilePic')!=="null" ? localStorage.getItem('ownerProfilePic') : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
        setBeforeEditOwner({
            ownerName: localStorage.getItem('ownerName'),
            email: localStorage.getItem('ownerEmail')
        })
        setOwnerForm({
            ownerName: localStorage.getItem('ownerName'),
            email: localStorage.getItem('ownerEmail')
        })
    }, [])

    return (
        <>
            <Modal show={emailVerifiedModal.state} onHide={handleCloseEmailVerifiedModal}>
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Verify Email</Modal.Title>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleCloseEmailVerifiedModal}></button>
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

            <Modal show={passRestModal} onHide={handleClosePassResetModal} >
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Reset Password</Modal.Title>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleClosePassResetModal}></button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-4">
                        <form onSubmit={resetPassword}>
                            <div className="d-flex flex-column align-items-start justify-content-center" >
                                <label className="mt-3" htmlFor="">Old Password<span style={{color: 'red'}}>*</span> </label>
                                <input type="password" name="oldPass" onChange={passOnChange} className="inputText shadow-sm" placeholder="Enter your old password"/>

                                <label className="mt-3" htmlFor="">New Password<span style={{color: 'red'}}>*</span> </label>
                                <input type="password" name="newPass" onChange={passOnChange} className="inputText shadow-sm" placeholder="Enter your new password"/>

                                <label className="mt-3" htmlFor="">Confirm new Password<span style={{color: 'red'}}>*</span> </label>
                                <input type="password" name="confirmNewPass" onChange={passOnChange} className="inputText shadow-sm" placeholder="Confirm new password"/>
                                {passError&& (passResetForm.confirmNewPass!==passResetForm.newPass) &&
                                <label className="errorLabelPass">Passwords do not match</label> }
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn saveChanges">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="profileHead">
                    <h1>Owner Profile</h1>
                </div>
                <div className="image">
                    <div className="productImage d-flex flex-column align-items-center justify-content-center" onClick={handleImageClick}>
                        <label htmlFor="ownerImageInput">{image ? image.name : "Choose an image"} </label>
                        {image ? 
                            (typeof image === 'string' ? 
                                <img className="mt-3" style={{width: "200px", height: "200px",borderRadius: "50%"}} src={image} alt="" /> : 
                                <img className="mt-3" style={{width: "200px", height: "200px",borderRadius: "50%"}} src={URL.createObjectURL(image)} alt="" />
                            ) :
                            <img className="mt-3" style={{width: "200px", height: "200px",borderRadius: "50%"}} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                        }
                        <input type="file" name="ownerImageInput" ref={inputRef} onChange={ownerFormOnChange} className="productPicInput d-flex justify-content-center"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button disabled={typeof image === 'string'} onClick={handleImageUpload} className="btn saveChanges mt-4 d-flex justify-content-center">
                            Upload Image
                        </button>
                    </div>
                </div>
                <div className="ownerDetails mt-5">
                    <div className="row">
                        <div className="col-lg-3 inputLabel">
                            <h5 style={{textAlign: 'center'}}>Name</h5>
                        </div>
                        <div className="col-lg-9">
                            <input type="text" className="inputText shadow-sm" name="ownerName" value={ownerForm.ownerName} onChange={ownerFormOnChange} placeholder="Enter your name here"/>
                        </div>
                        <div className="col-lg-3 inputLabel">
                            <h5 style={{textAlign: 'center'}}>Email</h5>
                        </div>
                        <div className="col-lg-9">
                            <input type="email" className="inputText shadow-sm" name="email" value={ownerForm.email} onChange={ownerFormOnChange} placeholder="Enter your email here"/>
                        </div>
                    </div>
                </div>
                <div className="editSection">
                    <div className="mt-3">
                        <button className="btn" onClick={handleResetPassword} style={{border: '1px solid black'}}>
                            <i class="fa-solid fa-lock fa-md"></i> Change password
                        </button>
                    </div>
                    <div className="saveChangesBtn">
                        <button 
                            className="btn saveChanges mt-4" 
                            onClick={handleProfileFormWithCheck}
                            disabled={(ownerForm.ownerName===beforeEditOwner.ownerName && ownerForm.email===beforeEditOwner.email)} 
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
