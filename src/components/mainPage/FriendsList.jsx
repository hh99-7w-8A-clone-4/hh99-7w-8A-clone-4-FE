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
  }, []);
  const { userName, userProfileImg, userInfo } = localStorage;
  return (
    <StFriendsList>
      <StMyProfileSection>
        <ProfileCard
          key="mine"
          mine={true}
          nickName={userName}
          profileImg={userProfileImg}
          info={userInfo}
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
