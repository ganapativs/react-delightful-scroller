/**
 * TODO:
 * - Unmount cards?
 * - Use scrollRestoration to reduce batch creation - https://itsze.ro/blog/2017/04/09/infinite-list-and-react.html
 * - Scroll restoration
 * - Optimize every piece of code
 * - Custom element scroll
 * - More stories
 * - Multiple axis support
 * - Testing
 * - Animatable card story
 */

/**
 * Things learnt
 * React.memo re-renders when context is used
 *   - https://github.com/facebook/react/issues/15156
 * Use requestAnimationFrame instead of throttle on scroll
 *   - https://gist.github.com/paulmillr/3118943
 *   - https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
 * react remounts rendered node when ref and functional component reference change in render
 */
import React, { memo } from "react";
import useWindowSize from "@rehooks/window-size";
import { getBatchedItems } from "./getBatchedItems";
import { BatchRenderer } from "./BatchRenderer";
import { useVisibilityAndDimension } from "./useVisibilityAndDimension";
import { getVisibleIndexes } from "./getVisibleIndexes";
import { Sentinel } from "./Sentinel";
import { DefaultRenderItem, DefaultRenderContainer } from "./DefaultRenderers";

const BaseRenderer = ({
  containerHeight,
  items,
  RenderItem,
  getItemKey,
  wrapperElement,
  forwardRef,
  RenderContainer,
  removeFromDOM,
  root,
  batchSize,
  axis,
  averageItemHeight,
  itemHeight,
  itemsCount,
  batchBufferDistance,
  onFetchMore,
  RenderLoader,
  fetchMoreBufferDistance
}) => {
  const [dimensions, visibility, setDimension] = useVisibilityAndDimension({
    root,
    axis,
    containerHeight,
    itemsCount,
    itemHeight,
    averageItemHeight,
    batchSize,
    batchBufferDistance
  });

  const batchedItems = getBatchedItems(items, batchSize);
  let current = batchedItems;
  let previous = [];
  let next = [];
  let prevHeight;
  let nextHeight;

  if (removeFromDOM) {
    const [startIndex, endIndex] = getVisibleIndexes(visibility);
    previous = batchedItems.slice(0, startIndex);
    current = batchedItems.slice(startIndex, endIndex + 1);
    next = batchedItems.slice(endIndex + 1, batchedItems.length);

    prevHeight = previous.reduce((p, c, i) => {
      const index = i;
      const dimension = dimensions[index];
      return p + dimension.height;
    }, 0);

    nextHeight = next.reduce((p, c, i) => {
      const index = previous.length + current.length + i;
      const dimension = dimensions[index];
      return p + dimension.height;
    }, 0);
  }

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
        RenderItem={RenderItem}
        dimensions={dimensions[index]}
        visible={visibility[index]}
        itemHeight={itemHeight}
      />
    );
  });

  const Container = (
    <RenderContainer forwardRef={forwardRef}>
      {prevHeight ? (
        <div style={{ height: prevHeight, visibility: "hidden" }} />
      ) : null}
      {batchedElements}
      {nextHeight ? (
        <div style={{ height: nextHeight, visibility: "hidden" }} />
      ) : null}
      {axis === "y" && items.length < itemsCount ? (
        <Sentinel
          onFetchMore={onFetchMore}
          fetchMoreBufferDistance={fetchMoreBufferDistance}
          RenderLoader={RenderLoader}
          wrapperElement={wrapperElement}
          items={items}
          itemsCount={itemsCount}
          batchSize={batchSize}
          root={root}
          axis={axis}
        />
      ) : null}
    </RenderContainer>
  );

  return Container;
};

BaseRenderer.displayName = "BaseRenderer";

const WindowContainer = props => {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <BaseRenderer
      {...props}
      containerWidth={innerWidth}
      containerHeight={innerHeight}
    />
  );
};

const Entry = (props, ref) => {
  if (!props.root) {
    return <WindowContainer {...props} forwardRef={ref} />;
  }

  // TODO - Custom container
  return null;
};

const DelightfulScroller = memo(React.forwardRef(Entry));

DelightfulScroller.defaultProps = {
  /** Items to render */
  items: [],
  /** Total number of items to render */
  itemsCount: 0,
  /** Item renderer component */
  RenderItem: DefaultRenderItem,
  /** Get unique key for every item, used to detect item value change */
  getItemKey: (item, index) => (typeof item === "string" ? item : index),
  /** HTML tag used to wrap each rendered item and sentinel */
  wrapperElement: "div",
  /** Container node renderer component */
  RenderContainer: DefaultRenderContainer,
  removeFromDOM: true,
  /** Scroll parent - should be an element */
  root: null,
  averageItemHeight: 10, // Average item height should be min 1px
  itemHeight: null, // Fixed item height(Optional)
  axis: "y",
  batchSize: 10, // Batch items into batch of n elements
  batchBufferDistance: 250, // Batch buffer distance on both sides in px
  fetchMoreBufferDistance: 500, // fetch more buffer distance on both sides in px
  // eslint-disable-next-line no-unused-vars
  onFetchMore: ({ items, itemsCount, batchSize }) => {},
  // eslint-disable-next-line no-unused-vars
  RenderLoader: ({ items, itemsCount, batchSize }) => null
};

DelightfulScroller.displayName = "DelightfulScroller";

export default DelightfulScroller;
