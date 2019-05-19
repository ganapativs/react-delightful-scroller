import { useState } from 'react';

export function useDimensions() {
  const [dimensions, setDimension] = useState(new Map());
  const wrappedSetDimensions = (index, value) => {
    // We could create a new copy of map here
    dimensions.set(index, value);
    setDimension(dimensions);
  };
  return [dimensions, wrappedSetDimensions];
}
