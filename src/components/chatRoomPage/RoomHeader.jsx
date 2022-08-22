import React from "react";
import styled from "styled-components";
import {
  AiOutlineLine,
  AiOutlineBorder,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineBell,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

function RoomHeader() {
  return (
    <StHeaderContainer>
      <StInfoContainer>
        <img src="https://images.unsplash.com/photo-1497171156029-51dfc973e5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
        <div className="name-container">
          <span>강태훈</span>
          <AiOutlineSearch />
        </div>
      </StInfoContainer>
      <StNavGroup>
        <div className="outNav">
          <AiOutlineLine />
          <AiOutlineBorder />
          <NavLink to={-1}>
            <AiOutlineClose />
          </NavLink>
        </div>

        <div className="innerNav">
          <AiOutlineBell />
          <AiOutlineMenu />
        </div>
      </StNavGroup>
    </StHeaderContainer>
  );
}

const StHeaderContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 100vw;
  height: 74px;
  background-color: #a9bdce;
`;

const StInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100vw - 80px);
  img {
    width: 45px;
    height: 45px;
    border-radius: 41%;
  }
  .name-container {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    span {
      padding-bottom: 10px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const StNavGroup = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 15px;
    height: 15px;
    :nth-of-type(2) {
      margin: 0 7px;
    }
  }
  .innerNav {
    svg {
      width: 22px;
      height: 22px;
      padding: 4px;
      background-color: #a0b3c3;
      border-radius: 50%;
    }
  }
`;

export default RoomHeader;
