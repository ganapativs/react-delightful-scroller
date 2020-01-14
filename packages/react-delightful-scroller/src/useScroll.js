import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

const getScrollOffset = (element, axis) => {
  if (axis === 'y') {
    const { scrollTop, scrollY } = element;
    if (scrollTop !== undefined) {
      return scrollTop;
    }
    return scrollY;
  }
  if (axis === 'x') {
    const { scrollLeft, scrollX } = element;
    if (scrollLeft !== undefined) {
      return scrollLeft;
    }
    return scrollX;
  }

  return 0;
};

export const useScroll = ({ root, axis }) => {
  const timeout = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const element = root ? root() : window;
    const handler = throttle(() => {
      window.cancelAnimationFrame(timeout.current);
      timeout.current = window.requestAnimationFrame(() =>
        setScrollOffset(getScrollOffset(element, axis)),
      );
    }, 100);
    element.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      if (handler.cancel) {
        handler.cancel();
      }
      window.cancelAnimationFrame(timeout.current);
      element.removeEventListener('scroll', handler);
    };
  }, [axis, root]);

  return scrollOffset;
};
