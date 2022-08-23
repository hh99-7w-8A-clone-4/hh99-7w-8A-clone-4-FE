import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import RoomHeader from "../components/chatRoomPage/RoomHeader";
import ChatSubmitBox from "../components/chatRoomPage/ChatSubmitBox";
import ChatCard from "../elements/ChatCard";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

function ChatRoomPage() {
  const { roomId } = useParams();
  const WSURI = useSelector((state) => state.chatSlice.URI) + "/ws";
  const stompClient = useRef(null);
  useEffect(() => {
    let sockJs = new SockJS(WSURI);
    stompClient.current = webstomp.over(sockJs);
    stompClient.current.connect({}, function (payload) {
      console.log(payload);
      console.log("연결은 되었음 ㅎ");
      stompClient.current.subscribe(
        `/sub/chat/room/${roomId}`,
        function (frame) {
          console.log(JSON.parse(frame.body));
        },
        {}
      );
    });
    // stompClient.connect({}, function (payload) {
    //   console.log(payload);
    //   console.log("connected with server!");

    //   const sendBody = JSON.stringify({ content: "얍!" });
    //   stompClient.send(`/pub/room/${roomId}/message`, sendBody, {});
    // });
    return () => {
      stompClient.current
        .subscribe(
          `/sub/chat/room/${roomId}`,
          function (frame) {
            console.log(JSON.parse(frame.body));
          },
          {}
        )
        .unsubscribe();
    };
  }, []);

  return (
    <StChatRoomPage>
      <RoomHeader />
      <StChatListContainer>
        <ChatCard author="friend" body="윽엑 어지럽다어지러워" />
        <ChatCard author="me" body="살려줘~" />
        <ChatCard author="friend" body="응 안대" />
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
