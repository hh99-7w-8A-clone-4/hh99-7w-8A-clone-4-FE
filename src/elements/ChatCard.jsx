import React, { startTransition } from "react";
import styled, { css } from "styled-components";

function ChatCard({ author, body }) {
  return (
    <StChatContainer author={author}>
      {author === "friend" && (
        <img src="https://images.unsplash.com/photo-1613688270958-f76694a3daef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2231&q=80" />
      )}
      {author === "me" && <span className="create-time">오후 04:44</span>}
      <StMainContentWrapper>
        {author === "friend" && <h3>강머훈</h3>}

        <StChatCard author={author}>{body}</StChatCard>
      </StMainContentWrapper>
      {author === "friend" && <span className="create-time">오후 04:44</span>}
    </StChatContainer>
  );
}

const StChatContainer = styled.div`
  position: relative;
  display: flex;
  max-width: calc(100% - 80px);
  padding: 7px;
  margin-top: 7px;
  .create-time {
    align-self: flex-end;
    padding-left: 8px;
    font-size: 12px;
    width: 60px;
  }

  img {
    width: 43px;
    height: 43px;
    border-radius: 41%;
    margin-right: 18px;
  }
  ${({ author }) => {
    switch (author === "me") {
      case true:
        return css`
          align-self: flex-end;
          .create-time {
            padding-left: 18px;
            padding-right: 8px;
          }
        `;
    }
  }}
`;

const StMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 0.9rem;
    font-weight: 400;
    padding-bottom: 5px;
  }
`;

const StChatCard = styled.div`
  text-align: justify;
  display: inline-block;
  font-size: 13px;
  border-radius: 4px;
  padding: 5px;
  ${({ author }) => {
    switch (author === "me") {
      case true:
        return css`
          align-self: flex-end;
          background-color: #ffeb33;
          ::after {
            position: absolute;
            right: -3px;

            content: "▶";
            color: #ffeb33;
            font-size: 18px;
            transform: rotate(30deg);
          }
        `;
      default:
        return css`
          background-color: #fff;
          ::before {
            position: absolute;
            left: 60px;
            content: "◀";
            color: #fff;
            font-size: 18px;
            top: 25px;
            transform: rotate(30deg);
          }
        `;
    }
  }}
`;

export default ChatCard;
