import React, { useState } from "react";
import styled, { css } from "styled-components";

function ChatSubmitBox({ stompClient }) {
  const [chatBody, setChatBody] = useState("");
  const handleSubmitChat = (e) => {
    e.preventDefault();
    stompClient.current.send(`url`, chatBody, {});
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
