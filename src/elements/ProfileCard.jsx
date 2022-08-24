import userEvent from "@testing-library/user-event";
import React from "react";
import styled, { css } from "styled-components";

function ProfileCard({ mine, nickName, profileImg, info, children }) {
  return (
    <StProfileCard mine={mine}>
      <img src={profileImg} placeholder="프로필사진" />
      <StTextWrapper>
        <h3>{nickName}</h3>
        <p>{info}</p>
      </StTextWrapper>
      {children}
    </StProfileCard>
  );
}

const StProfileCard = styled.div`
  display: flex;
  position: relative;
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
  button {
    position: absolute;
    right: 20px;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    border: 1.5px solid #c8c8c8;
    background-color: #fff;
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
