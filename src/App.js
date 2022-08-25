import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './reset.css';
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage"
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Kakaologin from './pages/KakaoLogin';


const App = (props) => {
  return (
    <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chatRoom/:roomId" element={<ChatRoomPage />} />
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/kakaoLogin' element={<Kakaologin/>}/>
          <Route path='/signUp' element={<Registerpage/>}/>
        </Routes>
    </>

  );
}

export default App;