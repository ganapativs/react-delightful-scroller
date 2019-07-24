import { useState, useRef } from 'react';

export const useDimensions = (initialValue = []) => {
  const [dimensions, setDimension] = useState(initialValue);
  // Set state is async, we need a ref to store intermediate value
  const intermediate = useRef(null);
  const wrappedSetDimensions = (index, dimension) => {
    const newDimensions = [
      ...((intermediate && intermediate.current) || dimensions),
    ];
    newDimensions[index] = { ...dimension };
    intermediate.current = newDimensions;
    setDimension(newDimensions);
  };
  return [dimensions, wrappedSetDimensions];
};
