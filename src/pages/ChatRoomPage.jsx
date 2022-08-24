import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import RoomHeader from "../components/chatRoomPage/RoomHeader";
import ChatSubmitBox from "../components/chatRoomPage/ChatSubmitBox";
import ChatCard from "../elements/ChatCard";
import { __getinitialChatList } from "../redux/modules/chatSlice";
import { postChat, clearChat } from "../redux/modules/chatSlice";

function ChatRoomPage() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const listRef = useRef();
  const WSURI = useSelector((state) => state.chatSlice.URI) + "/ws";
  const stompClient = useRef(null);
  const prevDate = useRef(0);
  const chatList = useSelector((state) => state.chatSlice.chatList);
  useEffect(() => {
    let sockJs = new SockJS(WSURI);
    let subscription;
    stompClient.current = webstomp.over(sockJs);
    stompClient.current.connect(
      {},
      function (payload) {
        dispatch(__getinitialChatList(roomId));
        subscription = stompClient.current.subscribe(
          `/sub/chat/room/${roomId}`,
          function (frame) {
            dispatch(postChat(JSON.parse(frame.body)));
          },
          {
            Authorization: localStorage.getItem("accessToken"),
          }
        );
      },
      function (payload) {
        console.log(payload);
      }
    );

    return () => {
      dispatch(clearChat());
      prevDate.current = null;
      const headers = { memberId: localStorage.getItem("userId"), roomId };
      subscription.unsubscribe(headers);
      stompClient.current.disconnect();
    };
  }, [dispatch]);
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [chatList]);
  return (
    <StChatRoomPage>
      <RoomHeader />
      <StChatListContainer ref={listRef}>
        {chatList?.map((chat) => {
          const convertToDate = new Date(chat.createdAt);
          let options = { weekday: "long" };
          const intl = new Intl.DateTimeFormat("ko-KR", options).format(
            convertToDate
          );
          if (
            prevDate.current < convertToDate.getDate() ||
            prevDate.current == null
          ) {
            prevDate.current = convertToDate.getDate();
            return (
              <>
                <p
                  key={
                    convertToDate.getFullYear() +
                    "년" +
                    convertToDate.getMonth() +
                    "월" +
                    convertToDate.getDate() +
                    "."
                  }
                >
                  {convertToDate.getFullYear() +
                    "년 " +
                    convertToDate.getMonth() +
                    "월 " +
                    convertToDate.getDate() +
                    "일 " +
                    intl}
                </p>
                <ChatCard
                  key={chat.createdAt}
                  author={
                    chat.memberId === parseInt(localStorage.getItem("userId"))
                      ? "me"
                      : "friend"
                  }
                  body={chat.content}
                  createdAt={chat.createdAt}
                  nickName={chat.nickname}
                  profilePic={chat.profilePic}
                />
              </>
            );
          } else {
            prevDate.current = convertToDate.getDate();
            return (
              <ChatCard
                key={chat.createdAt}
                author={
                  chat.memberId === parseInt(localStorage.getItem("userId"))
                    ? "me"
                    : "friend"
                }
                body={chat.content}
                createdAt={chat.createdAt}
                nickName={chat.nickname}
                profilePic={chat.profilePic}
              />
            );
          }
        })}
      </StChatListContainer>
      <ChatSubmitBox stompClient={stompClient} roomId={roomId} />
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
  overflow-y: scroll;
  flex-direction: column;
  height: calc(100vh - 177px);
  p {
    align-self: center;
    margin-top: 20px;
    width: 60%;
    background-color: #ffffff88;
    border-radius: 15px;
    font-size: 0.9rem;
    padding: 2px 0;
    letter-spacing: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ChatRoomPage;
