import userEvent from "@testing-library/user-event";
import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

function ChatRoomCard({ mine }) {
  const handleOnChatRoom = () => {};

  return (
    <StChatRoomCard mine={mine}>
      <img
        src="https://images.unsplash.com/photo-1661102165730-dfb7f86b8206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
        placeholder="방 프로필"
      />
      <StTextWrapper>
        <Link to="/chatRoom">
          <h3>강태훈,강머훈</h3>
          <p>윽엑윽옥악엑악</p>
        </Link>
      </StTextWrapper>
    </StChatRoomCard>
  );
}

const StChatRoomCard = styled.div`
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
`;
export default ChatRoomCard;
