import React, { memo } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: table;
  width: 100%;
`;

const Render = ({ item, index, renderItem, wrapperElement, setDimensions }) => {
  return (
    <Measure
      bounds
      onResize={contentRect => {
        setDimensions(index, contentRect.bounds);
      }}>
      {({ measureRef }) => (
        <Wrapper as={wrapperElement} ref={measureRef}>
          {renderItem(item, index)}
        </Wrapper>
      )}
    </Measure>
  );
};

export const RenderItem = memo(
  Render,
  ({ item: prevItem }, { item }) => prevItem === item,
);
