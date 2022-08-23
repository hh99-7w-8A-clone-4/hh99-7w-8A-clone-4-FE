import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProfileCard from "../../elements/ProfileCard";
import { __getFriendList } from "../../redux/modules/friendSlice";

function FriendsList({ stompClient }) {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendSlice.friends);
  useEffect(() => {
    dispatch(__getFriendList());
    if (stompClient.connected === true) {
      stompClient?.disconnect();
    }
  }, []);
  return (
    <StFriendsList>
      <StMyProfileSection>
        <ProfileCard
          mine={true}
          nickName="강태훈"
          profileImg="https://images.unsplash.com/photo-1661102165730-dfb7f86b8206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
          info="10월까지 속세와 단절합니다."
        />
      </StMyProfileSection>
      <StLine></StLine>
      <p className="friends-counter">친구 {friends.length}</p>
      {friends.map((friend) => {
        return (
          <ProfileCard
            key={friend.memberId}
            nickName={friend.nickname}
            profileImg={friend.profilePic}
            info={friend.introduce}
          />
        );
      })}
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
