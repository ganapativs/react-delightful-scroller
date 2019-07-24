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
    console.log('Batch render', index);
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
    const batchWithResizeObserver = visible ? (
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
    ) : (
      <div
        style={{
          height: dimensions.scroll.height,
        }}
      />
    );

    return batchWithResizeObserver;
  },
  ({ batch: prevBatch, visible: prevVisible }, { batch, visible }) => {
    const batchItemsHaveSameRef =
      prevBatch.length === batch.length &&
      prevBatch.every((e, i) => e === batch[i]);

    return batchItemsHaveSameRef && prevVisible === visible;
  },
);
