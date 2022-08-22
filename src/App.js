import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chatRoom/:roomId" element={<ChatRoomPage />} />
    </Routes>
  );
}

export default App;
