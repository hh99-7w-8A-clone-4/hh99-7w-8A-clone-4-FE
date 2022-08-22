import React from "react";
import styled from "styled-components";
import ChatRoomCard from "../../elements/ChatRoomCard";

function ChatRoomList() {
  return (
    <StChatRoomList>
      <ChatRoomCard roomId={1} />
      <ChatRoomCard roomId={2} />
    </StChatRoomList>
  );
}

const StChatRoomList = styled.div`
  width: calc(100vw - 66px);
  height: calc(100vh - 178px);
  background-color: #ffffff;
`;
export default ChatRoomList;
