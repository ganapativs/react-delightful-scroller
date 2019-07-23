/**
 * TODO:
 * - Scroll to index
 * - Store visible items range
 * - Wrap elements in resize observer
 */
import React, { memo } from 'react';
import useWindowSize from '@rehooks/window-size';
import { IScrollerProvider } from './context';
import { useVisibility } from './useVisibility';
import { initializeInitialVisibility } from './initializeInitialVisibility';
import { getBatchedItems } from './getBatchedItems';
import { useDimensions } from './useDimensions';
import { BatchRenderer } from './BatchRenderer';
import { useScroll } from './useScroll';

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
}) {
  const [dimensions, setDimension] = useDimensions({});
  const scrollOffset = useScroll(root, axis);
  const [visibilityMap, setVisibility] = useVisibility(
    initializeInitialVisibility({
      axis,
      containerHeight,
      itemHeight,
      averageItemHeight,
      batchSize,
    }),
  );
  console.log('TCL: scrollOffset', scrollOffset);

  const batchedItems = getBatchedItems(items, batchSize);
  const batchedElements = batchedItems.map((batch, index) => {
    return <BatchRenderer key={index} batch={batch} index={index} />;
  });
  const Container = containerRenderer({
    children: batchedElements,
    ref: forwardRef,
  });

  return (
    <IScrollerProvider
      value={{
        renderItem,
        getItemKey,
        wrapperElement,
        removeFromDOM,
        batchSize,
        dimensions,
        setDimension,
      }}>
      {Container}
    </IScrollerProvider>
  );
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
