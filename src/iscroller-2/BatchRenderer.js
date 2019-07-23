import React, { useContext } from 'react';
import IScrollerContext from './context';
import Measure from 'react-measure';
import { Wrapper } from './Wrapper';
import { RenderItem } from './RenderItem';

export const BatchRenderer = ({ batch, index }) => {
  const {
    getItemKey,
    batchSize,
    wrapperElement,
    removeFromDOM,
    dimensions,
    setDimension,
  } = useContext(IScrollerContext);
  const items = batch.map((item, idx) => {
    const actualIndex = batchSize * index + idx;
    const key = getItemKey(item, actualIndex);
    return <RenderItem key={key} item={item} index={actualIndex} />;
  });
  const batchWithResizeObserver = (
    <Measure
      // ScrollHeight is actual height of batch including content margins
      scroll
      onResize={contentRect => {
        setDimension(index, contentRect);
      }}>
      {({ measureRef }) => (
        <Wrapper
          data-iscroller-batch={index}
          as={wrapperElement}
          ref={measureRef}>
          {items}
        </Wrapper>
      )}
    </Measure>
  );
  return batchWithResizeObserver;
};
