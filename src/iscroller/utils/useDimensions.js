import { useState, useRef } from 'react';

export function useDimensions() {
  const [dimensionsMap, setDimension] = useState(new Map());
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(new Map(dimensionsMap));

  const wrappedSetDimensions = (index, value) => {
    const prevValue = intermediate.current.get(index);

    // If prev and current values are same, do nothing
    if (prevValue && prevValue.top === value.top) {
      return;
    }

    const newDimensionsMap = new Map(intermediate.current);
    newDimensionsMap.set(index, { ...value });
    intermediate.current = newDimensionsMap;

    setDimension(newDimensionsMap);
  };

  return [dimensionsMap, wrappedSetDimensions];
}
