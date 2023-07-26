import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Home from './Components/Home';
import Login from './Components/Login'
import Otp from './Components/Otp'
import Dashboard from './Components/Dashboard';
import OrderItem from './Components/OrderItem';
import ErrorPage from './Components/ErrorPage';
import ResetPassword from './Components/ResetPassword';

function App() {
    return (

        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup /> }/>
                <Route path='/login' element={<Login />} />
                <Route path='/otp' element={<Otp />}/>
                <Route path='/resetpassword' element={<ResetPassword />}/>
                <Route path='/dashboard/*' element={<Dashboard />} />
                <Route path='/orderitem' element={<OrderItem/>} />
                <Route path='*' element={<ErrorPage />}></Route>
            </Routes>
        </div>

    )
}

export default App;