import { useState, useRef } from 'react';

export function useVisibility(initial = {}) {
  const [visibilityMap, setVisibility] = useState(initial);
  // Set state is not immediate, we need a ref to store intermediate value
  const intermediate = useRef(null);

  const wrappedSetVisibility = (index, visibility) => {
    const newDimensions = { ...intermediate.current };
    newDimensions[index] = visibility;
    intermediate.current = newDimensions;
    setVisibility(newDimensions);
  };

  return [visibilityMap, wrappedSetVisibility];
}
