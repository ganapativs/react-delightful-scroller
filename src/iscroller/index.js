/**
 * TODO:
 * - Scroll to index
 * - Store visible items range
 * - Wrap elements in resize observer
 */

/**
 * Things learnt
 * React.memo re-renders when context is used
 *   - https://github.com/facebook/react/issues/15156
 * Use requestAnimationFrame instead of throttle on scroll
 *   - https://gist.github.com/paulmillr/3118943
 *   - https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
 */
import React, { memo } from 'react';
import useWindowSize from '@rehooks/window-size';
import { getBatchedItems } from './getBatchedItems';
import { BatchRenderer } from './BatchRenderer';
import { useVisibilityAndDimension } from './useVisibilityAndDimension';
import { getVisibleIndexes } from './getVisibleIndexes';

function IScroller({
  containerWidth,
  containerHeight,
  items,
  renderItem,
  getItemKey,
  wrapperElement,
  forwardRef,
  containerRenderer,
  removeFromDOM,
  root,
  batchSize,
  axis,
  averageItemHeight,
  itemHeight,
  itemsCount,
}) {
  const [dimensions, visibility, setDimension] = useVisibilityAndDimension({
    root,
    axis,
    containerHeight,
    itemsCount,
    itemHeight,
    averageItemHeight,
    batchSize,
  });

  const batchedItems = getBatchedItems(items, batchSize);
  let [startIndex, endIndex] = getVisibleIndexes(visibility);
  const previous = batchedItems.slice(0, startIndex);
  const current = batchedItems.slice(startIndex, endIndex + 1);
  const next = batchedItems.slice(endIndex + 1, batchedItems.length);

  const prevHeight = previous.reduce((p, c, i) => {
    const index = i;
    const dimension = dimensions[index];
    return p + dimension.height;
  }, 0);

  const nextHeight = next.reduce((p, c, i) => {
    const index = previous.length + current.length + i;
    const dimension = dimensions[index];
    return p + dimension.height;
  }, 0);

  const batchedElements = current.map((batch, i) => {
    const index = previous.length + i;
    return (
      <BatchRenderer
        key={index}
        batch={batch}
        index={index}
        getItemKey={getItemKey}
        batchSize={batchSize}
        wrapperElement={wrapperElement}
        removeFromDOM={removeFromDOM}
        setDimension={setDimension}
        renderItem={renderItem}
        dimensions={dimensions[index]}
        visible={visibility[index]}
      />
    );
  });

  const Container = containerRenderer({
    children: (
      <>
        <div style={{ height: prevHeight, visibility: 'hidden' }} />
        {batchedElements}
        <div style={{ height: nextHeight, visibility: 'hidden' }} />
      </>
    ),
    ref: forwardRef,
  });

  return Container;
}

IScroller.defaultProps = {
  /** Items to render */
  items: [],
  /** Total number of items to render */
  itemsCount: 0,
  /** Item renderer function */
  renderItem: item => item,
  /** Get unique key for every item, used to detect item value change */
  getItemKey: (item, index) => (typeof item === 'string' ? item : index),
  /** HTML tag used to wrap each rendered item */
  wrapperElement: 'div',
  /** Container node renderer */
  containerRenderer: ({ children, ref }) => <div ref={ref}>{children}</div>,
  removeFromDOM: true,
  /** Scroll parent - should be an element */
  root: null,
  averageItemHeight: 10, // Average item height should be min 1px
  itemHeight: null, // Fixed item height(Optional)
  axis: 'y',
  batchSize: 10, // Batch items into batch of n elements
  // fetchItems={() => {}}
  // loader={() => "Loading..."}
};

const WindowContainer = props => {
  let { innerWidth, innerHeight } = useWindowSize();

  return (
    <IScroller
      {...props}
      containerWidth={innerWidth}
      containerHeight={innerHeight}
    />
  );
};

export default memo(
  React.forwardRef((props, ref) => {
    if (!props.root) {
      return <WindowContainer {...props} forwardRef={ref} />;
    }

    // TODO - Custom container
    return null;
  }),
);
