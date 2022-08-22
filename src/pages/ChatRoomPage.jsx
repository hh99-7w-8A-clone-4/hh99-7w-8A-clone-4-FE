import React, { useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import RoomHeader from "../components/chatRoomPage/RoomHeader";
import ChatSubmitBox from "../components/chatRoomPage/ChatSubmitBox";
import ChatCard from "../elements/ChatCard";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

function ChatRoomPage() {
  let sockJs = new SockJS(`${URI.BASE}/ws`);
  let stomp_client;
  const handleSendMsg = () => {
    stomp_client.send("");
  };
  useEffect(() => {
    stomp_client = webstomp.over(sockJs);

    stomp_client.connect({}, function (payload) {
      console.log(payload);
      console.log("connected with server!");
      stomp_client.subscribe(
        "/sub/chat/room",
        function (frame) {
          console.log(JSON.parse(frame));
        },
        {}
      );
      stomp_client.send("/pub/room/message", {}, JSON.stringify("얍!"));
    });
    return () => {
      stomp_client.disconnect();
    };
  }, []);

  return (
    <StChatRoomPage>
      <RoomHeader />
      <StChatListContainer>
        <ChatCard author="friend" body="윽엑 어지럽다어지러워" />
        <ChatCard
          author="me"
          body="나주거나주거 나주거 나살려조 나주거 나주거"
        />
      </StChatListContainer>
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
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 177px);
`;

export default ChatRoomPage;
