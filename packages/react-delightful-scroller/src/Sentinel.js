import React, { useRef, useEffect } from 'react';

export const Sentinel = ({
  fetchMoreBufferDistance,
  onFetchMore,
  RenderLoader,
  wrapperElement,
  items,
  itemsCount,
  batchSize,
  root,
  axis,
  style,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const targetNode = ref.current;
    const options = {
      root: root ? root() : null,
      rootMargin:
        axis === 'y' ? `0px 0px ${fetchMoreBufferDistance}px 0px` : '0px',
      threshold: 0,
    };
    const callback = ([{ isIntersecting }]) => {
      if (isIntersecting) {
        onFetchMore({ size: items.length, itemsCount, batchSize });
      }
    };
    const observer = new IntersectionObserver(callback, options);
    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => {
      // Stop watching all of its target elements for visibility changes
      observer.disconnect();
    };
  }, [
    axis,
    fetchMoreBufferDistance,
    batchSize,
    items,
    onFetchMore,
    root,
    itemsCount,
  ]);

  return React.createElement(
    wrapperElement,
    {
      ref,
      style: {
        ...style,
        display: axis === 'x' ? 'inline-flex' : 'block',
      },
    },
    <RenderLoader
      size={items.length}
      axis={axis}
      itemsCount={itemsCount}
      batchSize={batchSize}
    />,
  );
};
