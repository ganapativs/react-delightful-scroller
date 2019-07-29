import React from "react";

export const RenderItemWrapper = React.memo(
  ({ item, index, RenderItem }) => <RenderItem item={item} index={index} />,
  ({ item: prevItem }, { item }) => prevItem === item
);

RenderItemWrapper.displayName = "RenderItemWrapper";
