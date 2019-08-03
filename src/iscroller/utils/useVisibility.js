import { useState, useRef } from 'react';

export function useVisibility(initial = new Map()) {
  const [visibilityMap, setVisibility] = useState(initial);
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(new Map(visibilityMap));

  const wrappedSetVisibility = (index, value) => {
    const prevValue = intermediate.current.get(index);

    // If prev and current values are same, do nothing
    if (prevValue && prevValue === value) {
      return;
    }

    const newVisibilityMap = new Map(intermediate.current);
    newVisibilityMap.set(index, value);
    intermediate.current = newVisibilityMap;

    setVisibility(newVisibilityMap);
  };

  return [visibilityMap, wrappedSetVisibility];
}
