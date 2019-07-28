import React from "react";
import Measure from "react-measure";
import { Wrapper } from "./Wrapper";
import { RenderItemWrapper } from "./RenderItemWrapper";

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
    itemHeight
  }) => {
    const hasFixedHeightItems = !!itemHeight;
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
          data-iscroller-batch={index}
          as={wrapperElement}
          style={
            !removeFromDOM ? { visibility: visible ? "visible" : "hidden" } : {}
          }
        >
          {items}
        </Wrapper>
      );

      batchWrapper = hasFixedHeightItems ? (
        // No need to add resize observer to batch of fixed height items
        itemsBatch
      ) : (
        // Add resize observer to batch of dynamic items
        <Measure
          // ScrollHeight is actual height of batch including content margins
          scroll
          onResize={contentRect => {
            setDimension(index, contentRect);
          }}
        >
          {({ measureRef }) =>
            React.cloneElement(itemsBatch, { ref: measureRef })
          }
        </Measure>
      );
    } else {
      batchWrapper = (
        <div
          style={{
            height: dimensions.height
          }}
        />
      );
    }

    return batchWrapper;
  },
  ({ batch: prevBatch, visible: prevVisible }, { batch, visible }) => {
    const batchItemsHaveSameRef =
      prevBatch.length === batch.length &&
      prevBatch.every((e, i) => e === batch[i]);

    return batchItemsHaveSameRef && prevVisible === visible;
  }
);

BatchRenderer.displayName = "BatchRenderer";
