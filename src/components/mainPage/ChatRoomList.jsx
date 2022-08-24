import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import ChatRoomCard from "../../elements/ChatRoomCard";

function ChatRoomList({ stompClient }) {
  const WSURI = useSelector((state) => state.chatSlice.URI) + "/ws";
  // const stompClient = useRef(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let listSubscription;
    listSubscription = stompClient.subscribe(
      `/sub/room/${localStorage.getItem("userId")}`,
      function (frame) {
        console.log(frame);
        setRooms([...rooms, ...JSON.parse(frame.body)]);
      }
    );
    stompClient.send(
      `/pub/room/${localStorage.getItem("userId")}`,
      {},
      {
        Authorization: localStorage.getItem("accessToken"),
      }
    );
    // stompClient.current = webstomp.over(sockJs);
    // stompClient.current.connect({}, function (payload) {
    //   listSubscription

    //   console.log(stompClient.current);
    // });
    return () => {
      listSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let invitedRoomSubscription;
    if (stompClient.connected) {
      invitedRoomSubscription = stompClient.subscribe(
        `/sub/room/invite/${localStorage.getItem("userId")}`,
        function (payload) {
          setRooms([...rooms, payload]);
        }
      );
    }
    return () => {
      invitedRoomSubscription.unsubscribe();
    };
  }, [rooms]);
  console.log(stompClient);
  return (
    <>
      <StChatRoomList>
        {rooms.length === 0 ? (
          <h1 className="no-chatroom">참여중인 채팅방이 없어요!</h1>
        ) : (
          rooms.map((room) => {
            return (
              <ChatRoomCard
                key={room.roomMasterId}
                roomId={room.roomMasterId}
                roomName={room.roomName}
                people={room.people}
                stompClient={stompClient}
                initialRecentChat={room.recentChat}
                unReadCount={room.unReadCount}
              />
            );
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
