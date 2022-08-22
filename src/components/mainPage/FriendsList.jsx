import React from "react";
import styled from "styled-components";
import ProfileCard from "../../elements/ProfileCard";

function FriendsList() {
  return (
    <StFriendsList>
      <StMyProfileSection>
        <ProfileCard mine={true} />
      </StMyProfileSection>
      <StLine></StLine>
      <p className="friends-counter">친구 118</p>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </StFriendsList>
  );
}

const StFriendsList = styled.div`
  width: calc(100vw - 66px);
  height: calc(100vh - 178px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  .friends-counter {
    width: 100%;
    font-size: 0.8rem;
    padding-left: 20px;
    padding-bottom: 5px;
    margin: 0;
    justify-self: flex-start;
  }
`;

const StMyProfileSection = styled.div`
  padding: 0 0 5px 0;
`;

const StLine = styled.span`
  width: 90%;
  border-top: 2px solid #f6f6f6;
  font-size: 0.7rem;
  padding-top: 7px;
  padding-bottom: 3px;
`;
export default FriendsList;
