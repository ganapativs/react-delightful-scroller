import React from "react";

// Keep components outside render, creating new instance of
// components in each update will discard(unmount)
// old components and re-creates them inside scroller
export const RenderContainer = ({ children, forwardRef }) => {
  return <div ref={forwardRef}>{children}</div>;
};
