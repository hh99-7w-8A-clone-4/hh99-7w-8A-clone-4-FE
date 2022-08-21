import React, { useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/mainPage/Footer";
import SideBar from "../components/mainPage/SideBar";
import FriendsList from "../components/mainPage/FriendsList";
import Header from "../components/mainPage/Header";

function MainPage() {
  const [onChatList, setOnChatList] = useState(false);
  return (
    <StMainWrapper>
      <StContentsWrapper>
        <SideBar />
        <StBodyWrapper>
          <Header />
          <FriendsList />
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
