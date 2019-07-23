import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const getScrollOffset = (element, axis) => {
  const { scrollTop, scrollY } = element;
  return axis === 'y' ? (scrollTop !== undefined ? scrollTop : scrollY) : 0;
};

export const useScroll = (root, axis) => {
  const element = root || window;
  const handler = throttle(() => {
    setScrollOffset(getScrollOffset(element, axis));
  }, 50);
  const [scrollOffset, setScrollOffset] = useState(
    getScrollOffset(element, axis),
  );
  useEffect(() => {
    element.addEventListener('scroll', handler, { passive: true });
    return () =>
      element.removeEventListener('scroll', handler, { passive: true });
  }, [element, handler]);
  return scrollOffset;
};
