import { useState, useRef } from 'react';

export const useDimensions = (initialValue = []) => {
  const [dimensions, setDimension] = useState(initialValue);
  // Set state is async, we need a ref to store intermediate value
  const intermediate = useRef(null);
  const wrappedSetDimensions = (index, dimension) => {
    const newDimensions = [
      ...((intermediate && intermediate.current) || dimensions),
    ];
    const { width, height } = dimension.scroll;
    newDimensions[index] = { width, height };
    intermediate.current = newDimensions;
    setDimension(newDimensions);
  };
  return [dimensions, wrappedSetDimensions];
};
