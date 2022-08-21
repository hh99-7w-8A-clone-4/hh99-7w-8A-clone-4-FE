import React from "react";
import styled from "styled-components";

function Header() {
  return <StHeader>헤더임ㅎ </StHeader>;
}

const StHeader = styled.div`
  width: calc(100vw - 66px);
  height: 76px;
  background-color: #ffffff;
`;
export default Header;
