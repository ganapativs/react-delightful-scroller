import { useState, useRef } from 'react';

export function useVisibility(initial = []) {
  const [visibility, setVisibility] = useState(initial);
  // Set state is async, we need a ref to store intermediate value
  const intermediate = useRef(null);

  const wrappedSetVisibility = (index, visibility) => {
    const newVisibility = [
      ...((intermediate && intermediate.current) || visibility),
    ];
    newVisibility[index] = visibility;
    intermediate.current = newVisibility;
    setVisibility(newVisibility);
  };

  return [visibility, wrappedSetVisibility];
}
