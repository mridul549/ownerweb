import { useState } from 'react'
import AuthContext from './authContext'

const AuthState = (props) => {
    const [email, setEmail] = useState("")

    return (
        <AuthContext.Provider value={{email,setEmail}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState