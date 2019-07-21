import React, { memo } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components/macro';
import Observer from '@researchgate/react-intersection-observer';

const Wrapper = styled.div`
  display: table;
  width: 100%;
`;

const Render = ({
  item,
  index,
  renderItem,
  wrapperElement,
  setDimensions,
  setVisibility,
  dimension,
  visible,
  removeFromDOM,
  threshold,
  root,
  rootMargin,
  isBufferedCard,
}) => {
  let node = null;

  if (visible || !removeFromDOM || !dimension || isBufferedCard) {
    node = (
      <Measure
        offset
        onResize={contentRect => {
          setDimensions(index, contentRect.offset);
        }}>
        {({ measureRef }) => (
          <Wrapper
            as={wrapperElement}
            ref={measureRef}
            style={
              !removeFromDOM
                ? { visibility: visible ? 'visible' : 'hidden' }
                : {}
            }>
            {renderItem(item, index)}
          </Wrapper>
        )}
      </Measure>
    );
  } else {
    node = (
      <div
        style={{
          // top: dimension.top,
          height: dimension.height,
        }}
      />
    );
  }

  return (
    <Observer
      onChange={s => {
        console.log('TCL: index', index, s.isIntersecting);
        setVisibility(index, s.isIntersecting);
      }}
      threshold={threshold}
      root={root}
      rootMargin={rootMargin}>
      {node}
    </Observer>
  );
};

/*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
const areEqual = (
  {
    item: prevItem,
    dimension: prevDimension,
    visible: prevVisible,
    removeFromDOM: prevRemoveFromDOM,
    isBufferedCard: prevIsBufferedCard,
  },
  { item, dimension, visible, removeFromDOM, isBufferedCard },
) => {
  const eq =
    prevItem === item &&
    (prevDimension && prevDimension.top) === dimension.top &&
    prevVisible === visible &&
    prevRemoveFromDOM === removeFromDOM &&
    prevIsBufferedCard === isBufferedCard;

  return eq;
};

export const RenderItem = memo(Render, areEqual);
