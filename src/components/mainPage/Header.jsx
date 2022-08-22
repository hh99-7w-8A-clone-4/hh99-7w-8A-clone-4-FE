import React from "react";
import styled from "styled-components";

function Header({ isOn }) {
  return (
    <StHeader>
      <h1>{!isOn ? "친구" : "채팅"}</h1>
    </StHeader>
  );
}

const StHeader = styled.div`
  width: calc(100vw - 66px);
  height: 76px;
  background-color: #ffffff;
  padding-top: 30px;
  h1 {
    font-size: 1.15rem;
    padding-left: 15px;
  }
`;
export default Header;
