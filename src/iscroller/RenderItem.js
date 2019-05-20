import React, { memo, useState } from 'react';
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
  dimension,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <Observer
      onChange={s => {
        setVisible(s.isIntersecting);
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
  { item: prevItem, dimension: prevDimension },
  { item, dimension, index },
) =>
  prevItem === item || (prevDimension && prevDimension.top) === dimension.top;

export const RenderItem = memo(Render, areEqual);
