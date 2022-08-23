import React, { useState } from "react";
import styled, { css } from "styled-components";

function ChatSubmitBox({ stompClient, roomId }) {
  const [chatBody, setChatBody] = useState("");

  const handleSubmitChat = (e) => {
    e.preventDefault();
    const createdAt = Date.now().toString();
    const content = {
      content: chatBody,
      memberId: localStorage.getItem("userId"),
      nickname: localStorage.getItem("userName"),
      profilePic:
        "https://images.unsplash.com/photo-1497171156029-51dfc973e5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      createdAt,
    };
    stompClient.current.send(
      `/pub/chat/room/${roomId}`,
      JSON.stringify(content),
      {
        Authorization: localStorage.getItem("accessToken"),
      }
    );
    setChatBody("");
  };
  return (
    <StBoxContainer>
      <StChatForm onSubmit={handleSubmitChat} chatLength={chatBody.length}>
        <textarea
          onChange={(e) => {
            setChatBody(e.target.value);
          }}
          value={chatBody}
        />
        <button>전송</button>
      </StChatForm>
    </StBoxContainer>
  );
}

const StBoxContainer = styled.div`
  width: 100vw;
  height: 103px;
  background-color: #fff;
`;

const StChatForm = styled.form`
  padding: 10px 8px 8px 10px;
  width: 100%;
  height: 80%;
  display: flex;
  textarea {
    width: calc(100vw - 74px);
    height: 100%;
    flex-grow: 1;
    overflow-y: scroll;
    text-align: justify;
    resize: none;
    border: none;
    font-size: 0.8rem;
    :focus {
      outline: none;
    }
  }

  button {
    margin-left: 8px;
    width: 48px;
    height: 28px;
    background-color: #ffec42;
    border: 1px solid #e8d73f;
    border-radius: 5px;
    ${({ chatLength }) => {
      switch (chatLength > 0) {
        case true:
          return css`
            color: rgba(0, 0, 0, 1);
          `;
        default:
          return css`
            color: rgba(0, 0, 0, 0.3);
          `;
      }
    }}
  }
`;

export default ChatSubmitBox;
