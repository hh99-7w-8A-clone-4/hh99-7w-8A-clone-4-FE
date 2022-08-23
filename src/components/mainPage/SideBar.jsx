import React from "react";
import styled from "styled-components";
import { AiOutlineUser, AiOutlineWechat } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

function SideBar({ handleStatus, handleLogout }) {
  return (
    <StSideBar>
      <AiOutlineUser
        onClick={() => {
          handleStatus(false);
        }}
      />
      <AiOutlineWechat
        onClick={() => {
          handleStatus(true);
        }}
      />
      <RiLogoutCircleRLine
        onClick={() => {
          handleLogout();
        }}
      />
    </StSideBar>
  );
}

const StSideBar = styled.div`
  position: relative;
  width: 66px;
  height: calc(100vh - 102px);
  background-color: #ececed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-left: 2px;
  border-right: 2px solid #e9e9ea;
  svg {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin-bottom: 28px;
    :hover {
      background-color: #b5b6b9;
      border-radius: 50%;
    }
    :nth-of-type(3) {
      position: absolute;
      bottom: 10px;
    }
  }
`;
export default SideBar;
