import React from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineWechat } from "react-icons/ai";

function SideBar({ onChat, handleStatus }) {
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
    </StSideBar>
  );
}

const StSideBar = styled.div`
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
    width: 35px;
    height: 35px;
    margin-bottom: 28px;
  }
`;
export default SideBar;
