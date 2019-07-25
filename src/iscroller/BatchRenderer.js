import React from 'react';
import Measure from 'react-measure';
import { Wrapper } from './Wrapper';
import { RenderItemWrapper } from './RenderItemWrapper';

export const BatchRenderer = React.memo(
  ({
    batch,
    index,
    getItemKey,
    batchSize,
    wrapperElement,
    removeFromDOM,
    dimensions,
    setDimension,
    RenderItem,
    visible,
  }) => {
    let batchElement = null;

    if (visible || !removeFromDOM) {
      const items = batch.map((item, idx) => {
        const actualIndex = batchSize * index + idx;
        const key = getItemKey(item, actualIndex);
        return (
          <RenderItemWrapper
            key={key}
            item={item}
            index={actualIndex}
            RenderItem={RenderItem}
          />
        );
      });

      batchElement = (
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
              ref={measureRef}
              style={
                !removeFromDOM
                  ? { visibility: visible ? 'visible' : 'hidden' }
                  : {}
              }>
              {items}
            </Wrapper>
          )}
        </Measure>
      );
    } else {
      batchElement = (
        <div
          style={{
            height: dimensions.height,
          }}
        />
      );
    }

    return batchElement;
  },
  ({ batch: prevBatch, visible: prevVisible }, { batch, visible }) => {
    const batchItemsHaveSameRef =
      prevBatch.length === batch.length &&
      prevBatch.every((e, i) => e === batch[i]);

    return batchItemsHaveSameRef && prevVisible === visible;
  },
);
