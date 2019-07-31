import React from "react";
import styled from "styled-components/macro";
import { Card } from "../components/helpers";

const Quote = styled.span`
  position: absolute;
  font-size: 80px;
  line-height: 80px;
  opacity: 0.3;
  top: -20px;
`;

const Phrase = styled.p`
  padding-left: 40px;
  font-style: italic;
  font-size: 18px;
  line-height: 26px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

const FlexOneVertical = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--white);

  span:first-child {
    font-weight: bold;
  }

  span:nth-child(2) {
    font-size: 14px;
  }
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border: 4px solid var(--darkYellow);
  border-radius: 50%;
`;

const RelativeDiv = styled.div`
  position: relative;
  margin-top: 30px;
`;

const FollowButton = styled.button`
  color: ${props => (props.following ? "var(--black)" : "var(--white)")};
  border: 2px solid
    ${props => (props.following ? "var(--darkYellow)" : "var(--darkYellow)")};
  background: ${props =>
    props.following ? "var(--darkYellow)" : "transparent"};
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
  padding: 4px 15px;
  font-size: 14px;
  min-width: 110px;
  font-weight: bold;
  transition: color 0.1s ease, border-color 0.1s ease, background 0.1s ease;
  span:nth-child(2) {
    display: none;
  }

  &:hover {
    color: ${props => (props.following ? "var(--white)" : "var(--black)")};
    border-color: ${props =>
      props.following ? "var(--pinky)" : "var(--yellow)"};
    background: ${props =>
      props.following ? "var(--pinky)" : "var(--yellow)"};
    transition: color 0.15s ease-in, border-color 0.15s ease-in,
      background 0.15s ease-in;

    span:nth-child(1) {
      display: none;
    }
    span:nth-child(2) {
      display: inline;
    }
  }
`;

const UserArea = ({ item }) => (
  <Flex>
    <AvatarImg src={item.avatar} loading="lazy"></AvatarImg>
    <FlexOneVertical>
      <span>{item.name}</span>
      <span>{item.company}</span>
    </FlexOneVertical>
    <FollowButton type="button" following={item.following}>
      {item.following ? (
        <>
          <span>Following</span>
          <span>Unfollow</span>
        </>
      ) : (
        <>
          <span>Follow</span>
          <span>Follow</span>
        </>
      )}
    </FollowButton>
  </Flex>
);

export const RenderItem = ({ item }) => {
  return (
    <Card key={item.phrase}>
      <UserArea item={item} />
      <RelativeDiv>
        <Quote>“</Quote>
        <Phrase contentEditable={item.editable}>{item.phrase}</Phrase>
      </RelativeDiv>
    </Card>
  );
};

export const RenderFixedHeightItem = ({ item }) => {
  return (
    <Card key={item.phrase}>
      <UserArea item={item} />
    </Card>
  );
};
