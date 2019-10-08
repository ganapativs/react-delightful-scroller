import React from 'react';

export const Wrapper = React.forwardRef(
  ({ as = 'div', style, children }, ref) =>
    React.createElement(as, { ref, style }, children),
);

Wrapper.displayName = 'Wrapper';
