export const getVisibleIndexes = visibility => {
  let start;
  let end;

  for (let i = 0; i < visibility.length; i += 1) {
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
