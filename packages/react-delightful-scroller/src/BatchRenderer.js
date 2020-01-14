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
    itemHeight,
    itemWidth,
    axis,
  }) => {
    const hasFixedItems = axis === 'y' ? !!itemHeight : !!itemWidth;
    let batchWrapper = null;

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

      const itemsBatch = (
        <Wrapper
          data-scroller-batch={index}
          as={wrapperElement}
          style={{
            ...(!removeFromDOM
              ? { visibility: visible ? 'visible' : 'hidden' }
              : {}),
            ...(axis === 'x' ? { display: 'inline-flex' } : {}),
          }}>
          {items}
        </Wrapper>
      );

      batchWrapper = hasFixedItems ? (
        // No need to add resize observer to batch of fixed dimension items
        itemsBatch
      ) : (
        // Add resize observer to batch of dynamic items
        <Measure
          // Dimension of batch including content margins
          scroll
          onResize={contentRect => {
            setDimension(index, contentRect);
          }}>
          {({ measureRef }) =>
            React.cloneElement(itemsBatch, { ref: measureRef })
          }
        </Measure>
      );
    } else {
      batchWrapper = (
        <div
          style={{
            height: axis === 'y' ? dimensions.height : undefined,
            width: axis === 'x' ? dimensions.width : undefined,
          }}
        />
      );
    }

    return batchWrapper;
  },
  // Don't put equality check for batch items here!
  // prev batch items changes are reverted if next batch items are changed
  // Might create memory leak/closure issues in react hooks
);

BatchRenderer.displayName = 'BatchRenderer';

export const NoRemoveFromDOMBatcher = React.memo(
  props => <BatchRenderer {...props} />,
  (
    { batch: prevBatch, visible: prevVisible },
    { batch, visible, removeFromDOM },
  ) => {
    if (!removeFromDOM) {
      const batchItemsHaveSameRef =
        prevBatch.length === batch.length &&
        prevBatch.every((e, i) => e === batch[i]);
      return (
        batchItemsHaveSameRef &&
        prevVisible === visible &&
        prevVisible === false &&
        visible === false
      );
    }

    return true;
  },
);

NoRemoveFromDOMBatcher.displayName = 'NoRemoveFromDOMBatcher';
