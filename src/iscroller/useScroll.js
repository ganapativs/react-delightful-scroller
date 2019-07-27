import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

const getScrollOffset = (element, axis) => {
  const { scrollTop, scrollY } = element;
  return axis === 'y' ? (scrollTop !== undefined ? scrollTop : scrollY) : 0;
};

export const useScroll = ({ root, axis }) => {
  const timeout = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const element = root || window;
    const handler = throttle(() => {
      // If there's a timer, cancel it
      if (timeout.current) {
        window.cancelAnimationFrame(timeout.current);
      }
      // Setup the requestAnimationFrame
      timeout.current = window.requestAnimationFrame(() =>
        setScrollOffset(getScrollOffset(element, axis)),
      );
    }, 100);
    element.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      handler.cancel && handler.cancel();
      window.cancelAnimationFrame(timeout.current);
      element.removeEventListener('scroll', handler);
    };
  }, [axis, root]);

  return scrollOffset;
};
