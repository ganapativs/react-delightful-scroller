import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

const getScrollOffset = (element, axis) => {
  const { scrollTop, scrollY } = element;
  return axis === 'y' ? (scrollTop !== undefined ? scrollTop : scrollY) : 0;
};

export const useScroll = (root, axis) => {
  const element = root || window;
  const timeout = useRef(null);
  // const handler = throttle(() => {
  //   setScrollOffset(getScrollOffset(element, axis));
  // }, 100);
  const [scrollOffset, setScrollOffset] = useState(
    getScrollOffset(element, axis),
  );

  useEffect(() => {
    const handler = () => {
      // If there's a timer, cancel it
      if (timeout.current) {
        window.cancelAnimationFrame(timeout.current);
      }

      // Setup the new requestAnimationFrame()
      timeout.current = window.requestAnimationFrame(() => {
        // Run our scroll functions
        setScrollOffset(getScrollOffset(element, axis));
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
  }, [axis, element]);

  return scrollOffset;
};
