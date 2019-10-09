import React from 'react';
import styled from 'styled-components/macro';
import { Card } from './Card';

const Quote = styled.span`
  position: absolute;
  font-size: 80px;
  line-height: 80px;
  opacity: 0.1;
  top: -20px;
`;

const Phrase = styled.p`
  margin-left: 42px;
  font-size: 18px;
  line-height: 26px;
  font-family: 'Overpass Mono', monospace;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FlexRowWithPadding = styled(FlexRow)`
  padding: 10px 0;
`;

const FlexOne = styled.div`
  flex: 1;
`;
const CardWrapper = styled(FlexOne)`
  padding: 20px;
  box-shadow: -1px 0 4px -3px var(--darkYellow);
`;

const FlexOneVertical = styled(FlexOne)`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--white);

  span:first-child {
    font-weight: bold;
    font-size: 14px;
  }

  span:nth-child(2) {
    font-size: 14px;
    opacity: 0.6;
  }
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border: 2px solid var(--darkYellow);
  border-radius: 50%;
`;

const RelativeDiv = styled.div`
  position: relative;
  margin-top: 30px;
`;

const FollowButton = styled.button`
  color: ${props => (props.following ? 'var(--black)' : 'var(--white)')};
  border: 2px solid
    ${props => (props.following ? 'var(--darkYellow)' : 'var(--darkYellow)')};
  background: ${props =>
    props.following ? 'var(--darkYellow)' : 'transparent'};
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
  padding: 4px 15px;
  font-size: 14px;
  min-width: 110px;
  font-weight: bold;
  margin: 0 15px;
  transition: color 0.1s ease, border-color 0.1s ease, background 0.1s ease;

  .visible-lg:nth-child(2) {
    display: none;
  }

  .visible-xs {
    display: none;
  }

  &:hover {
    color: ${props => (props.following ? 'var(--white)' : 'var(--black)')};
    border-color: ${props =>
      props.following ? 'var(--pinky)' : 'var(--yellow)'};
    background: ${props =>
      props.following ? 'var(--pinky)' : 'var(--yellow)'};
    transition: color 0.15s ease-in, border-color 0.15s ease-in,
      background 0.15s ease-in;

    .visible-lg:nth-child(1) {
      display: none;
    }
    .visible-lg:nth-child(2) {
      display: inline;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 4px 10px;
    min-width: 30px;

    &:hover {
      .visible-lg:nth-child(2) {
        display: none;
      }
    }

    .visible-lg {
      display: none;
    }
    .visible-xs {
      display: inline !important;
    }
  }
`;

const UserArea = ({ item, onFollowToggle }) => (
  <FlexRowWithPadding>
    <AvatarImg src={item.avatar} loading="lazy"></AvatarImg>
    <FlexOneVertical>
      <span>{item.name}</span>
      <span>{item.company}</span>
    </FlexOneVertical>
    <FollowButton
      type="button"
      following={item.following}
      onClick={() => onFollowToggle(!item.following)}>
      {item.following ? (
        <>
          <span className="visible-lg">Following</span>
          <span className="visible-lg">Unfollow</span>
          <span className="visible-xs">x</span>
        </>
      ) : (
        <>
          <span className="visible-lg">Follow</span>
          <span className="visible-lg">Follow</span>
          <span className="visible-xs">+</span>
        </>
      )}
    </FollowButton>
  </FlexRowWithPadding>
);

const Number = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 20px;
  padding: 0 20px 0 20px;
  font-family: 'Overpass Mono', monospace;
  opacity: 0.2;
`;

export const RenderItem = ({
  item,
  index,
  items,
  setItems,
  showQuotes = true,
  ...rest
}) => {
  const onFollowToggle = newFollowState => {
    const currentItem = items[index];
    const newItems = [...items];
    newItems[index] = { ...currentItem, following: newFollowState };
    setItems(newItems);
  };

  return (
    <Card key={item.phrase} {...rest}>
      <FlexRow>
        <Number>{index.toString().padStart(6, 0)}</Number>
        <CardWrapper>
          <UserArea item={item} onFollowToggle={onFollowToggle} />
          {showQuotes ? (
            <RelativeDiv>
              <Quote>“</Quote>
              <Phrase
                contentEditable={item.editable}
                suppressContentEditableWarning={true}>
                {item.phrase}
              </Phrase>
            </RelativeDiv>
          ) : null}
        </CardWrapper>
      </FlexRow>
    </Card>
  );
};
