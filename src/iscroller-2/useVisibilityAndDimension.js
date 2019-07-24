import { useEffect, useRef } from 'react';
import { useDimensions } from './useDimensions';
import { initializeDimensions } from './initializeDimensions';
import { useVisibility } from './useVisibility';
import { initializeInitialVisibility } from './initializeInitialVisibility';

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

const getScrollOffset = (element, axis) => {
  const { scrollTop, scrollY } = element;
  return axis === 'y' ? (scrollTop !== undefined ? scrollTop : scrollY) : 0;
};

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

  const element = root || window;
  const timeout = useRef(null);

  useEffect(() => {
    function updateVisibility(scrollOffset) {
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
    }

    const handler = () => {
      // If there's a timer, cancel it
      if (timeout.current) {
        window.cancelAnimationFrame(timeout.current);
      }

      // Setup the new requestAnimationFrame()
      timeout.current = window.requestAnimationFrame(() => {
        // Run our scroll functions
        updateVisibility(getScrollOffset(element, axis));
      });
    };

    element.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(timeout.current);
      element.removeEventListener('scroll', handler);
    };
  }, [
    axis,
    batchSize,
    containerHeight,
    dimensions,
    element,
    itemsCount,
    setVisibility,
    visibility,
  ]);

  return [dimensions, visibility, setDimension];
};
