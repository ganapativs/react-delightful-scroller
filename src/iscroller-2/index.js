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
import React, { memo, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import { useVisibility } from './useVisibility';
import { initializeInitialVisibility } from './initializeInitialVisibility';
import { initializeDimensions } from './initializeDimensions';
import { getBatchedItems } from './getBatchedItems';
import { useDimensions } from './useDimensions';
import { BatchRenderer } from './BatchRenderer';
import { useScroll } from './useScroll';

// Time interval B 'overlaps' A if:
// B starts after A starts but before A finishes.
// B starts before A starts and finishes after A starts.
// https://stackoverflow.com/a/47668070/2627022
function areOverlapping(A, B) {
  if (B[0] < A[0]) {
    return B[1] > A[0];
  } else {
    return B[0] < A[1];
  }
}

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
  const [dimensions, setDimension] = useDimensions(
    initializeDimensions({
      itemsCount,
      axis,
      itemHeight,
      averageItemHeight,
      batchSize,
    }),
  );
  const scrollOffset = useScroll(root, axis, containerHeight);
  const [visibility, setVisibility] = useVisibility(
    initializeInitialVisibility({
      itemsCount,
      axis,
      containerHeight,
      itemHeight,
      averageItemHeight,
      batchSize,
    }),
  );

  useEffect(() => {
    const bufferOffset = 0;
    const limits = [
      scrollOffset - bufferOffset,
      scrollOffset + containerHeight + bufferOffset,
    ];
    const totalBatches = Math.ceil(itemsCount / batchSize);
    const newVisibility = Array.from({ length: totalBatches }).reduce(
      (p, c, i) => {
        const currentHeight = p.total;
        const nextHeight = p.total + dimensions[i].height;

        p.visibility[i] = areOverlapping(limits, [currentHeight, nextHeight]);
        p.total = nextHeight;
        return p;
      },
      { visibility: [], total: 0 },
    );

    const visibilityChanged = newVisibility.visibility.some(
      (e, i) => e !== visibility[i],
    );
    if (visibilityChanged) {
      setVisibility(newVisibility.visibility);
    }
  }, [
    batchSize,
    containerHeight,
    dimensions,
    itemsCount,
    scrollOffset,
    setVisibility,
    visibility,
  ]);

  const batchedItems = getBatchedItems(items, batchSize);
  const batchedElements = batchedItems.map((batch, index) => {
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
    children: batchedElements,
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
