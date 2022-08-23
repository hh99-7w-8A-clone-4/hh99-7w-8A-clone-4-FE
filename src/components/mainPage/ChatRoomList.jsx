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
      console.log("연결은 되었음 ㅎ");
      stompClient.current.subscribe(`/sub/rooms`, function (frame) {
        setRooms([...rooms, ...JSON.parse(frame.body)]);
      });
      console.log(stompClient.current);
    });
    return () => {
      // stompClient.current.disconnect();
    };
  }, []);
  return (
    <>
      <StChatRoomList>
        {rooms.length === 0 ? (
          <h1 className="no-chatroom">참여중인 채팅방이 없어요!</h1>
        ) : (
          rooms.map((room) => {
            return <ChatRoomCard roomId={room.roomMasterId} />;
          })
        )}
      </StChatRoomList>
    </>
  );
}

const StChatRoomList = styled.div`
  width: calc(100vw - 66px);
  height: calc(100vh - 178px);
  background-color: #ffffff;
  .no-chatroom {
    margin-top: 20px;
    text-align: center;
    font-size: 1.4rem;
  }
`;
export default React.memo(ChatRoomList);
