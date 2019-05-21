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
}) => {
  return (
    <Observer
      onChange={s => {
        setVisibility(index, s.isIntersecting);
      }}>
      {visible || !dimension ? (
        <Measure
          // bounds
          offset
          onResize={contentRect => {
            setDimensions(index, contentRect.offset);
          }}>
          {({ measureRef }) => (
            <Wrapper as={wrapperElement} ref={measureRef}>
              {renderItem(item, index)}
            </Wrapper>
          )}
        </Measure>
      ) : (
        <div
          style={{
            // transform: `translateY(${dimension.top}px)`,
            top: dimension.top,
            height: dimension.height,
          }}
        />
      )}
    </Observer>
  );
};

/*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
const areEqual = (
  { item: prevItem, dimension: prevDimension, visible: prevVisible },
  { item, dimension, visible, index },
) => {
  const eq =
    prevItem === item &&
    (prevDimension && prevDimension.top) === dimension.top &&
    prevVisible === visible;

  return eq;
};

export const RenderItem = memo(Render, areEqual);
