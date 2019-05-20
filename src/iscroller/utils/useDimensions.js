import { useState, useRef } from 'react';

export function useDimensions() {
  const [dimensions, setDimension] = useState(new Map());
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(null);

  const wrappedSetDimensions = (index, value) => {
    const prevValue = intermediate.current && intermediate.current.get(index);

    // If prev and current values are same, do nothing
    if (prevValue && prevValue.top === value.top) {
      return;
    }
    console.log('000');
    const newDimensions = new Map(intermediate.current);
    newDimensions.set(index, { ...value });
    intermediate.current = newDimensions;

    setDimension(newDimensions);
  };

  return [dimensions, wrappedSetDimensions];
}
