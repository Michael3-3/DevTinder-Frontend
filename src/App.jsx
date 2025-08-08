import { BrowserRouter , Route,Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Profile from "./components/Profile"
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Body/>} >
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
