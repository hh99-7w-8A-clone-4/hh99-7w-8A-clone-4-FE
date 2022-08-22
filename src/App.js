import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './reset.css';
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage"

const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loginpage/>}/>
          <Route path='/signUp' element={<Registerpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;