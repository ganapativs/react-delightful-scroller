import React from 'react';
import Measure from 'react-measure';
import { Wrapper } from './Wrapper';
import { RenderItem } from './RenderItem';

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
    renderItem,
    visible,
  }) => {
    let batchElement = null;

    if (visible) {
      const items = batch.map((item, idx) => {
        const actualIndex = batchSize * index + idx;
        const key = getItemKey(item, actualIndex);
        return (
          <RenderItem
            key={key}
            item={item}
            index={actualIndex}
            renderItem={renderItem}
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
              ref={measureRef}>
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
