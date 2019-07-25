import { useEffect, useRef, useState } from 'react';

const getScrollOffset = (element, axis) => {
  const { scrollTop, scrollY } = element;
  return axis === 'y' ? (scrollTop !== undefined ? scrollTop : scrollY) : 0;
};

export const useScroll = ({ root, axis }) => {
  const element = root || window;
  const timeout = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handler = () => {
      // If there's a timer, cancel it
      if (timeout.current) {
        window.cancelAnimationFrame(timeout.current);
      }
      // Setup the new requestAnimationFrame()
      timeout.current = window.requestAnimationFrame(() =>
        setScrollOffset(getScrollOffset(element, axis)),
      );
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
