import { useEffect } from 'react';
import { useDimensions } from './useDimensions';
import { initializeDimensions } from './initializeDimensions';
import { useVisibility } from './useVisibility';
import { initializeInitialVisibility } from './initializeInitialVisibility';
import { useScroll } from './useScroll';

// Time interval B 'overlaps' A if:
// B starts after A starts but before A finishes.
// B starts before A starts and finishes after A starts.
function areOverlapping(A, B) {
  if (B[0] < A[0]) {
    return B[1] > A[0];
  }
  return B[0] < A[1];
}

export const useVisibilityAndDimension = ({
  root,
  axis,
  itemsCount,
  containerWidth,
  averageItemWidth,
  itemWidth,
  containerHeight,
  itemHeight,
  averageItemHeight,
  batchSize,
  batchBufferDistance,
}) => {
  const [dimensions, setDimension] = useDimensions(
    initializeDimensions({
      itemsCount,
      axis,
      averageItemWidth,
      itemWidth,
      averageItemHeight,
      itemHeight,
      batchSize,
    }),
  );
  const [visibility, setVisibility] = useVisibility(
    initializeInitialVisibility({
      itemsCount,
      axis,
      containerWidth,
      averageItemWidth,
      itemWidth,
      containerHeight,
      averageItemHeight,
      itemHeight,
      batchSize,
    }),
  );
  const scrollOffset = useScroll({ root, axis });

  useEffect(() => {
    const renderWindow = [
      scrollOffset - batchBufferDistance,
      scrollOffset +
        (axis === 'y' ? containerHeight : containerWidth) +
        batchBufferDistance,
    ];
    const totalBatches = Math.ceil(itemsCount / batchSize);

    let nextTotal = 0;
    const nextVisibility = [];
    for (let i = 0; i < totalBatches; i += 1) {
      const current = nextTotal;
      const next = nextTotal + dimensions[i][axis === 'y' ? 'height' : 'width'];
      nextVisibility[i] = areOverlapping(renderWindow, [current, next]);
      nextTotal = next;
    }

    const visibilityChanged = nextVisibility.some(
      (e, i) => e !== visibility[i],
    );
    if (visibilityChanged) {
      setVisibility(nextVisibility);
    }
  }, [
    axis,
    containerWidth,
    batchSize,
    containerHeight,
    setVisibility,
    dimensions,
    itemsCount,
    scrollOffset,
    visibility,
    batchBufferDistance,
  ]);

  return [dimensions, visibility, setDimension];
};
