import React, { useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/mainPage/Footer";
import SideBar from "../components/mainPage/SideBar";
import FriendsList from "../components/mainPage/FriendsList";
import Header from "../components/mainPage/Header";
import ChatRoomList from "../components/mainPage/ChatRoomList";

function MainPage() {
  const [onChatList, setOnChatList] = useState(false);
  const handelOnChat = () => {
    setOnChatList(true);
  };
  return (
    <StMainWrapper>
      <StContentsWrapper>
        <SideBar onChat={onChatList} handleStatus={setOnChatList} />
        <StBodyWrapper>
          <Header isOn={onChatList} />
          {!onChatList ? <FriendsList /> : <ChatRoomList />}
        </StBodyWrapper>
      </StContentsWrapper>
      <Footer />
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
