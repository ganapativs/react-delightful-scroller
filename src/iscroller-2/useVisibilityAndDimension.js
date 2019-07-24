import { useEffect } from 'react';
import { useDimensions } from './useDimensions';
import { initializeDimensions } from './initializeDimensions';
import { useVisibility } from './useVisibility';
import { initializeInitialVisibility } from './initializeInitialVisibility';
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

export const useVisibilityAndDimension = ({
  root,
  axis,
  containerHeight,
  itemsCount,
  itemHeight,
  averageItemHeight,
  batchSize,
}) => {
  const [dimensions, setDimension] = useDimensions(
    initializeDimensions({
      itemsCount,
      axis,
      itemHeight,
      averageItemHeight,
      batchSize,
    }),
  );
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
  const scrollOffset = useScroll({ root, axis });

  useEffect(() => {
    const bufferOffset = 0;
    const limits = [
      scrollOffset - bufferOffset,
      scrollOffset + containerHeight + bufferOffset,
    ];
    const totalBatches = Math.ceil(itemsCount / batchSize);

    let nextTotal = 0;
    let nextVisibility = [];
    for (let i = 0; i < totalBatches; i++) {
      const currentHeight = nextTotal;
      const nextHeight = nextTotal + dimensions[i].height;
      nextVisibility[i] = areOverlapping(limits, [currentHeight, nextHeight]);
      nextTotal = nextHeight;
    }

    const visibilityChanged = nextVisibility.some(
      (e, i) => e !== visibility[i],
    );
    if (visibilityChanged) {
      setVisibility(nextVisibility);
    }
  }, [
    batchSize,
    containerHeight,
    setVisibility,
    dimensions,
    itemsCount,
    scrollOffset,
    visibility,
  ]);

  return [dimensions, visibility, setDimension];
};
