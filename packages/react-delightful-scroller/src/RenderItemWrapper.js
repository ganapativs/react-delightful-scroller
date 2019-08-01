import React from "react";

// Don't put equality check for items here!
// node won't update when other props on Render item changes
// Might create memory leak/closure issues in react hooks
export const RenderItemWrapper = React.memo(({ item, index, RenderItem }) => (
  <RenderItem item={item} index={index} />
));

RenderItemWrapper.displayName = "RenderItemWrapper";
