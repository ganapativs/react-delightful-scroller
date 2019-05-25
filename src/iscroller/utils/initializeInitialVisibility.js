export function initializeInitialVisibility(
  axis,
  containerHeight,
  itemHeight,
  averageItemHeight,
) {
  return () => {
    const estimatedInitialRows =
      axis === 'y'
        ? Math.ceil(containerHeight / (itemHeight || averageItemHeight))
        : // TODO - handle other directions
          0;
    const initial = new Map();
    for (
      let i = 0;
      i < Array.from({ length: estimatedInitialRows }).length;
      i++
    ) {
      initial.set(i, true);
    }
    return initial;
  };
}
