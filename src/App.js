import { Routes, Route, BrowserRouter } from "react-router-dom";
// import './reset.css';
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import ChatRoomPage from "./pages/ChatRoomPage";

const App = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/signUp" element={<Registerpage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/chatRoom/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </>
  );
};

export default App;
