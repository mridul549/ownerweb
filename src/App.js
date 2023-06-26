import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Home from './Components/Home';
import Login from './Components/Login'
import Otp from './Components/Otp'
import Dashboard from './Components/Dashboard';
import MenuItem from './Components/MenuItem'
import Category from './Components/Category'

function App() {
    return (

        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup /> }/>
                <Route path='/login' element={<Login />} />
                <Route path='/otp' element={<Otp />}/>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/menuitem' element={<MenuItem />} />
                <Route path='/category' element={<Category />} />
            </Routes>
        </div>

    )
}

export default App;