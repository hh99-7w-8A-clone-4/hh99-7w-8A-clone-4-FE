import React from "react";
import styled from "styled-components";
import RoomHeader from "../components/chatRoomPage/RoomHeader";
import ChatSubmitBox from "../components/chatRoomPage/ChatSubmitBox";

function ChatRoomPage() {
  return (
    <StChatRoomPage>
      <RoomHeader />
      <StChatListContainer>z</StChatListContainer>
      <ChatSubmitBox />
    </StChatRoomPage>
  );
}

const StChatRoomPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #afc0cf;
`;

const StChatListContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 177px);
`;

export default ChatRoomPage;
