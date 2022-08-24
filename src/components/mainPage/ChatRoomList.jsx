import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import ChatRoomCard from "../../elements/ChatRoomCard";

function ChatRoomList() {
  const WSURI = useSelector((state) => state.chatSlice.URI) + "/ws";
  const stompClient = useRef(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let sockJs = new SockJS(WSURI);
    let listSubscription;
    stompClient.current = webstomp.over(sockJs);
    stompClient.current.connect({}, function (payload) {
      listSubscription = stompClient.current.subscribe(
        `/sub/room/${localStorage.getItem("userId")}`,
        function (frame) {
          console.log(frame);
          setRooms([...rooms, ...JSON.parse(frame.body)]);
        }
      );

      stompClient.current.send(
        `/pub/room/${localStorage.getItem("userId")}`,
        {},
        {
          Authorization: localStorage.getItem("accessToken"),
        }
      );
      console.log(stompClient.current);
    });
    return () => {
      listSubscription.unsubscribe();
      stompClient.current.disconnect();
    };
  }, []);
  useEffect(() => {
    let invitedRoomSubscription;
    if (stompClient.current.connected) {
      invitedRoomSubscription = stompClient.current.subscribe(
        `/sub/room/invite/${localStorage.getItem("userId")}`,
        function (payload) {
          console.log(rooms);
          setRooms([...rooms, payload]);
        }
      );
    }
    return () => {
      invitedRoomSubscription?.unsubscribe();
    };
  }, [rooms]);
  console.log(rooms);
  const [ids, setIds] = useState({ user1: 0, user2: 0 });
  const onChange = (e) => {
    const { name, value } = e.target;
    setIds({ ...ids, [name]: parseInt(value) });
  };
  const handleSubmitInvite = (e) => {
    e.preventDefault();
    const friends = JSON.stringify([ids.user1, ids.user2]);
    console.log(friends);
    stompClient.current.send(
      `/pub/room/invite/${localStorage.getItem("userId")}`,

      friends,

      {
        Authorization: localStorage.getItem("accessToken"),
      }
    );
    setIds({ ...ids, user1: 0, user2: 0 });
    console.log(ids);
  };
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
                stompClient={stompClient.current}
                initialRecentChat={room.recentChat}
              />
            );
          })
        )}
        <form onSubmit={handleSubmitInvite}>
          <input
            placeholder="user1"
            name="user1"
            id="user1Id"
            onChange={onChange}
            value={ids.user1}
          />

          <input
            placeholder="user2"
            name="user2"
            id="user2Id"
            onChange={onChange}
            value={ids.user2}
          />
          <button>사람추가하기</button>
        </form>
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
