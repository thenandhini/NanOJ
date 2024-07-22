import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
       
      <Route path="/" element={<Signup></Signup>}></Route>
      
      <Route path="/login" element={<Login></Login>}></Route>
      
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
