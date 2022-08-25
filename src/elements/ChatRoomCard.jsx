import userEvent from "@testing-library/user-event";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { connectRoom } from "../redux/modules/currentRoomSlice";
import { useDispatch } from "react-redux";

function ChatRoomCard({
  roomId,
  roomName,
  roomPic,
  people,
  stompClient,
  initialRecentChat,
  unReadCount,
}) {
  const [recentChat, setRecentChat] = useState("");
  const unReadChat = useRef(unReadCount);
  const dispatch = useDispatch();
  useEffect(() => {
    let recentChatSubscription;

    recentChatSubscription = stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      function (frame) {
        setRecentChat(JSON.parse(frame.body).content);
        unReadChat.current += 1;
        // setChatList([...chatList, JSON.parse(frame.body).content]);

        // setChatList(받은채팅리스트 ?);
      },
      {
        Authorization: localStorage.getItem("accessToken"),
      }
    );

    return () => {
      recentChatSubscription.unsubscribe();
    };
  }, []);
  const handleOpenRoom = () => {
    unReadChat.current = 0;
  };
  return (
    <Link
      to={`/chatRoom/${roomId}`}
      onClick={() => {
        dispatch(connectRoom({ roomName, roomPic }));
      }}
    >
      <StChatRoomCard>
        <img src={roomPic} placeholder="방 프로필 사진" />
        <StTextWrapper>
          <h3>
            {roomName} {people}
          </h3>
          <p>{recentChat !== "" ? recentChat : initialRecentChat}</p>
          {unReadChat.current !== 0 && (
            <div className="unReadAlert">{unReadChat.current}</div>
          )}
        </StTextWrapper>
      </StChatRoomCard>
    </Link>
  );
}

const StChatRoomCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: calc(100vw - 66px);
  height: 70px;
  background-color: #ffffff;
  img {
    width: 45px;
    height: 45px;
    border-radius: 41%;
  }
  :hover {
    background-color: #f8f8f8;
  }
`;

const StTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 5px 0 3px 0;
    font-size: 0.8rem;
    margin-left: 10px;
  }

  p {
    margin: 0 0 5px 0;
    font-size: 0.8rem;
    margin-left: 10px;
  }
  .unReadAlert {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 22px;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    background-color: red;
    border-radius: 50%;
  }
`;
export default ChatRoomCard;
