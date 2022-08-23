import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import ChatRoomCard from "../../elements/ChatRoomCard";

function ChatRoomList() {
  const WSURI = useSelector((state) => state.chatSlice.URI) + "/ws";
  let stompClient = useRef(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let sockJs = new SockJS(WSURI);
    stompClient.current = webstomp.over(sockJs);
    console.log(stompClient.current);
    stompClient.current.connect({}, function (payload) {
      console.log(payload);
      console.log("연결은 되었음 ㅎ");
      stompClient.current.subscribe(`/sub/rooms`, function (frame) {
        setRooms([...rooms, ...JSON.parse(frame.body)]);
      });
    });
    return () => {
      stompClient.current.disconnect();
    };
  }, []);
  return (
    <StChatRoomList>
      <ChatRoomCard roomId={1} stompClient={stompClient} />
      <ChatRoomCard roomId={2} stompClient={stompClient} />
    </StChatRoomList>
  );
}

const StChatRoomList = styled.div`
  width: calc(100vw - 66px);
  height: calc(100vh - 178px);
  background-color: #ffffff;
`;
export default ChatRoomList;
