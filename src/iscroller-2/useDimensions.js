import { useState, useRef } from 'react';

export const useDimensions = (initialValue = {}) => {
  const [dimensions, setDimension] = useState(initialValue);
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(null);
  const wrappedSetDimensions = (index, dimension) => {
    const newDimensions = { ...intermediate.current };
    newDimensions[index] = { ...dimension };
    intermediate.current = newDimensions;
    setDimension(newDimensions);
  };
  return [dimensions, wrappedSetDimensions];
};
