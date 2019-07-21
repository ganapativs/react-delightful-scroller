/**
 * TODO:
 * - Scroll to index
 * - Store visible items range
 * - Wrap elements in resize observer
 */
import React, { memo } from 'react';
import useWindowSize from '@rehooks/window-size';
import { RenderItem } from './RenderItem';
import { useDimensions } from './utils/useDimensions';
import { useVisibility } from './utils/useVisibility';
import { getVisibleIndexes } from './utils/getVisibleIndexes';
import { initializeInitialVisibility } from './utils/initializeInitialVisibility';

function IScroller({
  containerWidth,
  containerHeight,
  items,
  renderItem,
  getItemKey,
  wrapperElement,
  forwardRef,
  itemContainerRenderer,
  removeFromDOM,
  threshold,
  root,
  rootMargin,
  averageItemHeight,
  itemHeight,
  axis,
  itemsCount,
  itemsBuffer,
}) {
  const [dimensionsMap, setDimensions] = useDimensions();
  const [visibilityMap, setVisibility] = useVisibility(
    initializeInitialVisibility(
      axis,
      containerHeight,
      containerWidth,
      itemHeight,
      averageItemHeight,
    ),
  );
  let [startIndex = 0, endIndex = itemsCount - 1] = getVisibleIndexes(
    visibilityMap,
  );
  const bufferedStartIndex = Math.max(startIndex - itemsBuffer, 0);
  console.log('TCL: bufferedStartIndex', bufferedStartIndex);
  const bufferedEndIndex = Math.min(endIndex + itemsBuffer, itemsCount);

  console.log('TCL: bufferedEndIndex', bufferedEndIndex);
  const previous = items.slice(0, bufferedStartIndex);
  const current = items.slice(bufferedStartIndex, bufferedEndIndex + 1);
  const next = items.slice(bufferedEndIndex + 1, itemsCount);

  const prevHeight = previous.reduce((p, c, i) => {
    const index = i;
    const dimension = dimensionsMap.get(index);

    const height =
      (dimension && dimension.height) || itemHeight || averageItemHeight;

    return p + height;
  }, 0);

  const nextHeight = next.reduce((p, c, i) => {
    const index = previous.length + current.length + i;
    const dimension = dimensionsMap.get(index);

    const height =
      (dimension && dimension.height) || itemHeight || averageItemHeight;

    return p + height;
  }, 0);

  const Elements = current.map((item, i) => {
    const index = previous.length + i;
    const key = getItemKey(item, index);
    const dimension = dimensionsMap.get(index);
    const visible = visibilityMap.get(index);
    const isBufferedCard =
      (index >= bufferedStartIndex && index < startIndex) ||
      (index > endIndex && index <= bufferedEndIndex);

    return (
      <RenderItem
        key={`${key}-${(dimension && dimension.top) || 'x'}`}
        wrapperElement={wrapperElement}
        item={item}
        index={index}
        renderItem={renderItem}
        setDimensions={setDimensions}
        setVisibility={setVisibility}
        dimension={dimension}
        visible={visible === undefined ? true : visible}
        removeFromDOM={removeFromDOM}
        threshold={threshold}
        root={root}
        rootMargin={rootMargin}
        isBufferedCard={isBufferedCard}
      />
    );
  });

  const Container = itemContainerRenderer({
    children: (
      <>
        <div style={{ height: prevHeight }} />
        {Elements}
        <div style={{ height: nextHeight }} />
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
  getItemKey: (item, index) => index,
  /** HTML tag used to wrap each rendered item */
  wrapperElement: 'div',
  /** Container node renderer */
  itemContainerRenderer: ({ children, ref }) => <div ref={ref}>{children}</div>,
  removeFromDOM: true,
  /** Percentage of the target's visibility the observer's callback should be executed */
  threshold: 0,
  /** Scroll parent - should be an element */
  root: null,
  /** Margin around the root */
  rootMargin: '0px 0px 0px 0px',
  averageItemHeight: 10, // Average item height should be 1px
  itemHeight: null, // Dynamic item height
  axis: 'y',
  itemsBuffer: 4, // Extra items to render on each side in both directions
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

// const CustomContainer = props => {
//   return (
//     <Measure
//       offset
//       onResize={contentRect => {
//         setDimensions(index, contentRect.offset);
//       }}>
//       {({ measureRef }) => (
//         <Wrapper
//           as={wrapperElement}
//           ref={measureRef}
//           style={
//             !removeFromDOM ? { visibility: visible ? 'visible' : 'hidden' } : {}
//           }>
//           {renderItem(item, index)}
//         </Wrapper>
//       )}
//     </Measure>
//   );
// };

export default memo(
  React.forwardRef((props, ref) => {
    if (!props.root) {
      return <WindowContainer {...props} forwardRef={ref} />;
    }

    // TODO - Custom container
    return null;
  }),
);
