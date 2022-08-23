import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/exports";
import { Navigate } from "react-router-dom";
import { asyncUserName, userLogout } from "../redux/modules/userSlice";
import Footer from "../components/mainPage/Footer";
import SideBar from "../components/mainPage/SideBar";
import FriendsList from "../components/mainPage/FriendsList";
import Header from "../components/mainPage/Header";
import ChatRoomList from "../components/mainPage/ChatRoomList";

function MainPage() {
  const dispatch = useDispatch();
  const loggedUserName = useSelector((state) => state.userSlice.userName);
  const [onChatList, setOnChatList] = useState(false);
  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.clear();
    dispatch(asyncUserName());
  };
  useEffect(() => {
    dispatch(asyncUserName());
  }, []);
  return (
    <StMainWrapper>
      <StContentsWrapper>
        <SideBar
          onChat={onChatList}
          handleStatus={setOnChatList}
          handleLogout={handleLogout}
        />
        <StBodyWrapper>
          <Header isOn={onChatList} />
          {!onChatList ? <FriendsList /> : <ChatRoomList />}
        </StBodyWrapper>
      </StContentsWrapper>
      <Footer />
      {loggedUserName === null && <Navigate to="/" replace={true} />}
    </StMainWrapper>
  );
}
const StMainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 643px !important;
  display: flex;
  flex-direction: column;
`;

const StContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export default MainPage;
