import React, { startTransition, useEffect } from "react";
import styled, { css } from "styled-components";

function ChatCard({ author, body, nickName, createdAt, profilePic }) {
  const sliceTime = new Date(createdAt);
  const createDate = sliceTime.getDate();
  const createDay = sliceTime.getDay();
  const createHour = sliceTime.getHours();
  const createMinute = sliceTime.getMinutes();

  return (
    <StChatContainer author={author}>
      {author === "friend" && <img src={profilePic} />}
      {author === "me" && (
        <span className="create-time">{createHour + ":" + createMinute}</span>
      )}
      <StMainContentWrapper>
        {author === "friend" && <h3>{nickName}</h3>}

        <StChatCard author={author}>{body}</StChatCard>
      </StMainContentWrapper>
      {author === "friend" && (
        <span className="create-time">{createHour + ":" + createMinute}</span>
      )}
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
