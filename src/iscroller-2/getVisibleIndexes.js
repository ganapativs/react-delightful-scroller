export const getVisibleIndexes = visibility => {
  let start = undefined;
  let end = undefined;

  for (let i = 0; i < visibility.length; i++) {
    const v = visibility[i];
    if (start !== undefined && end !== undefined && !v) {
      break;
    }
    if (start === undefined && v) {
      start = i;
    }
    if (start !== undefined && v) {
      end = i;
    }
  }

  return [start, end];
};
