export function initializeInitialVisibility({
  axis,
  containerHeight,
  itemHeight,
  averageItemHeight,
  batchSize,
}) {
  return () => {
    const estimatedInitialBatches =
      axis === 'y'
        ? Math.ceil(
            containerHeight / ((itemHeight || averageItemHeight) * batchSize),
          )
        : // TODO - handle other directions
          0;
    const initial = {};
    for (
      let i = 0;
      i < Array.from({ length: estimatedInitialBatches }).length;
      i++
    ) {
      initial[i] = true;
    }
    return initial;
  };
}
