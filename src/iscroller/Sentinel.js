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
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const targetNode = ref.current;
    const options = {
      root,
      rootMargin:
        axis === 'y' ? `0px 0px ${fetchMoreBufferDistance}px 0px` : '0px',
      threshold: 0,
    };
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onFetchMore({ items, itemsCount, batchSize });
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetNode);
    return () => observer.unobserve(targetNode);
  }, [
    axis,
    fetchMoreBufferDistance,
    batchSize,
    items,
    onFetchMore,
    root,
    itemsCount,
  ]);

  return React.createElement(wrapperElement, {
    ref,
    children: (
      <RenderLoader
        items={items}
        itemsCount={itemsCount}
        batchSize={batchSize}
      />
    ),
  });
};
