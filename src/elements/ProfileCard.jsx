import userEvent from "@testing-library/user-event";
import React from "react";
import styled, { css } from "styled-components";

function ProfileCard({ mine }) {
  return (
    <StProfileCard mine={mine}>
      <img
        src="https://images.unsplash.com/photo-1661102165730-dfb7f86b8206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
        placeholder="프로필사진"
      />
      <StTextWrapper>
        <h3>강태훈</h3>
        <p>10월까지 속세와 단절합니다</p>
      </StTextWrapper>
    </StProfileCard>
  );
}

const StProfileCard = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: calc(100vw - 66px);
  ${({ mine }) => {
    switch (mine) {
      case true:
        return css`
          height: 70px;
        `;
      default:
        return css`
          height: 60px;
        `;
    }
  }};
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
    margin: 5px 0 0 5px;
    font-size: 0.8rem;
    margin-left: 10px;
  }

  p {
    margin: 0 0 5px 0;
    font-size: 0.8rem;
    margin-left: 10px;
  }
`;
export default ProfileCard;
