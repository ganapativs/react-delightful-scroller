import React, { memo, useState, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import useComponentSize from '@rehooks/component-size';
import PropTypes from 'prop-types';
import { getBatchedItems } from './getBatchedItems';
import { BatchRenderer, NoRemoveFromDOMBatcher } from './BatchRenderer';
import { useVisibilityAndDimension } from './useVisibilityAndDimension';
import { getVisibleIndexes } from './getVisibleIndexes';
import { Sentinel } from './Sentinel';
import {
  DefaultRenderItem,
  DefaultRenderContainer,
  DefaultRenderLoader,
} from './DefaultRenderers';

const BaseRenderer = ({
  containerWidth,
  containerHeight,
  items,
  RenderItem,
  getItemKey,
  wrapperElement,
  forwardRef,
  RenderContainer,
  removeFromDOM,
  root,
  batch,
  batchSize,
  axis,
  averageItemHeight,
  itemHeight,
  averageItemWidth,
  itemWidth,
  itemsCount,
  batchBufferDistance,
  onFetchMore,
  RenderLoader,
  fetchMoreBufferDistance,
}) => {
  const [dimensions, visibility, setDimension] = useVisibilityAndDimension({
    root,
    axis,
    itemsCount,
    containerWidth,
    averageItemWidth,
    itemWidth,
    containerHeight,
    averageItemHeight,
    itemHeight,
    batchSize,
    batchBufferDistance,
  });

  const batchedItems = getBatchedItems(items, batchSize);
  const Batcher = removeFromDOM ? BatchRenderer : NoRemoveFromDOMBatcher;
  let current = batchedItems;
  let previousItems = [];
  let nextItems = [];
  let prev;
  let next;

  if (removeFromDOM && batch) {
    const [startIndex, endIndex] = getVisibleIndexes(visibility);
    previousItems = batchedItems.slice(0, startIndex);
    current = batchedItems.slice(startIndex, endIndex + 1);
    nextItems = batchedItems.slice(endIndex + 1, batchedItems.length);

    prev = previousItems.reduce((p, c, i) => {
      const index = i;
      const dimension = dimensions[index];
      return p + dimension[axis === 'y' ? 'height' : 'width'];
    }, 0);

    next = nextItems.reduce((p, c, i) => {
      const index = previousItems.length + current.length + i;
      const dimension = dimensions[index];
      return p + dimension[axis === 'y' ? 'height' : 'width'];
    }, 0);
  }

  const batchedElements = current.map((currentBatch, i) => {
    const index = previousItems.length + i;
    return (
      <Batcher
        key={`${index}`}
        batch={currentBatch}
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
        itemWidth={itemWidth}
        axis={axis}
      />
    );
  });

  const Container = (
    <RenderContainer forwardRef={forwardRef}>
      {prev ? (
        <div
          style={{
            height: axis === 'y' ? prev : undefined,
            width: axis === 'x' ? prev : undefined,
            visibility: 'hidden',
          }}
        />
      ) : null}
      {batchedElements}
      {next ? (
        <div
          style={{
            height: axis === 'y' ? next : undefined,
            width: axis === 'x' ? next : undefined,
            visibility: 'hidden',
          }}
        />
      ) : null}
      {['y', 'x'].includes(axis) && items.length < itemsCount ? (
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

BaseRenderer.displayName = 'BaseRenderer';

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

const CustomScrollContainer = props => {
  const { root } = props;
  const { width, height } = useComponentSize({ current: root() });

  return (
    <BaseRenderer {...props} containerWidth={width} containerHeight={height} />
  );
};

const Entry = (props, ref) => {
  const [render, setRender] = useState(!props.root);

  /**
   * Mount custom container after the first render cycle
   * to make sure the parent scroll node is available
   */
  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  if (render) {
    // Window scroll
    if (!props.root) {
      return <WindowContainer {...props} forwardRef={ref} />;
    }

    // Custom container scroll
    return <CustomScrollContainer {...props} forwardRef={ref} />;
  }

  return null;
};

const DelightfulScroller = memo(React.forwardRef(Entry));

DelightfulScroller.defaultProps = {
  items: [],
  itemsCount: 0,
  RenderItem: DefaultRenderItem,
  getItemKey: (item, index) => (typeof item === 'string' ? item : index),
  wrapperElement: 'div',
  RenderContainer: DefaultRenderContainer,
  removeFromDOM: true,
  root: null,
  averageItemHeight: 10,
  itemHeight: null,
  averageItemWidth: 10,
  itemWidth: null,
  axis: 'y',
  batch: true,
  batchSize: 10,
  batchBufferDistance: 500,
  fetchMoreBufferDistance: 500,
  RenderLoader: DefaultRenderLoader,
  // eslint-disable-next-line no-unused-vars
  onFetchMore: ({ items, itemsCount, batchSize }) => {},
};

DelightfulScroller.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  itemsCount: PropTypes.number,
  RenderItem: PropTypes.elementType,
  getItemKey: PropTypes.func,
  wrapperElement: PropTypes.string,
  RenderContainer: PropTypes.elementType,
  removeFromDOM: PropTypes.bool,
  root: PropTypes.func,
  averageItemHeight: PropTypes.number,
  itemHeight: PropTypes.number,
  averageItemWidth: PropTypes.number,
  itemWidth: PropTypes.number,
  axis: PropTypes.oneOf(['x', 'y']),
  batch: PropTypes.bool,
  batchSize: PropTypes.number,
  batchBufferDistance: PropTypes.number,
  fetchMoreBufferDistance: PropTypes.number,
  RenderLoader: PropTypes.elementType,
  onFetchMore: PropTypes.func,
};

DelightfulScroller.displayName = 'DelightfulScroller';

export default DelightfulScroller;
