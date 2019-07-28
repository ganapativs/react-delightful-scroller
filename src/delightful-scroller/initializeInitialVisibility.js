export function initializeInitialVisibility({
  axis,
  containerHeight,
  itemHeight,
  averageItemHeight,
  batchSize,
  itemsCount
}) {
  return () => {
    const totalBatches = Math.ceil(itemsCount / batchSize);
    const estimatedInitialBatches =
      axis === "y"
        ? Math.ceil(
            containerHeight / ((itemHeight || averageItemHeight) * batchSize)
          )
        : // TODO - handle other directions
          0;
    const initial = [];
    for (let i = 0; i < totalBatches; i += 1) {
      initial[i] = i < estimatedInitialBatches;
    }
    return initial;
  };
}
