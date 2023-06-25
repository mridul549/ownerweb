import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Home from './Components/Home';
import Login from './Components/Login'
import Otp from './Components/Otp'
import AuthState from './context/auth/authState';

function App() {
    return (
        <AuthState>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/otp' element={<Otp />}/>
                </Routes>
            </div>
        </AuthState>
    )
}

export default App;
