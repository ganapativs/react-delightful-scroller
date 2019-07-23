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
  containerRenderer,
  removeFromDOM,
  threshold,
  root,
  rootMargin,
  averageItemHeight,
  itemHeight,
  axis,
  itemsCount,
}) {
  const [dimensionsMap, setDimensions] = useDimensions();

  const Elements = items.map((item, index) => {
    const key = getItemKey(item, index);
    const dimension = dimensionsMap.get(index);

    return (
      <RenderItem
        key={`${key}-${(dimension && dimension.top) || 'x'}`}
        wrapperElement={wrapperElement}
        item={item}
        index={index}
        renderItem={renderItem}
        setDimensions={setDimensions}
        dimension={dimension}
        removeFromDOM={removeFromDOM}
        threshold={threshold}
        root={root}
        rootMargin={rootMargin}
      />
    );
  });

  const Container = containerRenderer({
    children: Elements,
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
