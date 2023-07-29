
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import History from "./pages/History"
import Aboutme from "./pages/Aboutme"
import Reset from './pages/Reset'

const App = () => {
  return (
    <>
    <Router>
<Routes>
<Route path="/" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/history" element={<History/>}/>
<Route path="/aboutme" element={<Aboutme/>}/>
<Route path="/reset" element={<Reset/>}/>
</Routes>
<Toaster/>
  </Router>

    </>
  )
}

export default App