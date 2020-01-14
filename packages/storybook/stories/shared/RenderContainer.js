import React from 'react';

// Keep components outside render, creating new instance of
// components in each update will discard(unmount)
// old components and re-creates them inside scroller
export const RenderContainer = ({ children, forwardRef, style }) => {
  console.log('TCL: RenderContainer -> style', style);
  return (
    <div ref={forwardRef} style={style}>
      {children}
    </div>
  );
};
