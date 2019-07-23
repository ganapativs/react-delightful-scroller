/**
 * TODO:
 * - Scroll to index
 * - Store visible items range
 * - Wrap elements in resize observer
 */
import React, { memo, useContext, useState, useRef } from 'react';
import useWindowSize from '@rehooks/window-size';
import IScrollerContext, { IScrollerProvider } from './context';
import Measure from 'react-measure';

const Wrapper = React.forwardRef(({ as = 'div', children }, ref) =>
  React.createElement(as, { ref }, children),
);

const getBatchedItems = (items, batchSize = 1) => {
  const itemsClone = [...items];
  let batched = [];
  while (itemsClone.length) {
    batched = [...batched, itemsClone.splice(0, batchSize)];
  }

  return batched;
};

const useDimensions = (initialValue = {}) => {
  const [dimensions, setDimension] = useState(initialValue);
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(null);

  const wrappedSetDimensions = (index, dimension) => {
    const newDimensions = { ...intermediate.current };
    newDimensions[index] = { ...dimension };
    intermediate.current = newDimensions;
    console.log(index, newDimensions);
    setDimension(newDimensions);
  };

  return [dimensions, wrappedSetDimensions];
};

const RenderItem = ({ item, index }) => {
  const { renderItem } = useContext(IScrollerContext);

  return renderItem(item, index);
};

const BatchRenderer = ({ batch, index }) => {
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
          ref={measureRef}
          // style={
          //   !removeFromDOM ? { visibility: visible ? 'visible' : 'hidden' } : {}
          // }
        >
          {items}
        </Wrapper>
      )}
    </Measure>
  );

  return batchWithResizeObserver;
};

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
}) {
  const [dimensions, setDimension] = useDimensions({});
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
