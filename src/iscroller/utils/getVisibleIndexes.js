export const getVisibleIndexes = map => {
  let start = undefined;
  let end = undefined;
  for (let [k, v] of map) {
    if (start !== undefined && end !== undefined && !v) {
      break;
    }
    if (start === undefined && v) {
      start = parseInt(k);
    }
    if (start !== undefined && v) {
      end = parseInt(k);
    }
  }
  return [start || 0, end || 0];
};
