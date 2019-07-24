import { useState } from 'react';

export function useVisibility(initial = []) {
  const [visibility, setVisibility] = useState(initial);

  const wrappedSetVisibility = newVisibility => {
    setVisibility(newVisibility);
  };

  return [visibility, wrappedSetVisibility];
}
