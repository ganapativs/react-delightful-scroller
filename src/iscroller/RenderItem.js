import React, { memo } from 'react';
import Measure from 'react-measure';

const Render = ({ item, index, renderItem, wrapperElement, setDimensions }) => {
  return (
    <Measure
      bounds
      onResize={contentRect => {
        setDimensions(index, contentRect.bounds);
      }}>
      {({ measureRef }) =>
        React.createElement(
          wrapperElement,
          { ref: measureRef },
          renderItem(item, index),
        )
      }
    </Measure>
  );
};

export const RenderItem = memo(
  Render,
  ({ item: prevItem }, { item }) => prevItem === item,
);
