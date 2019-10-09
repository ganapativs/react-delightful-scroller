import React from 'react';

export const Wrapper = React.forwardRef(
  ({ as = 'div', style, children, ...rest }, ref) =>
    React.createElement(as, { ref, style, ...rest }, children),
);

Wrapper.displayName = 'Wrapper';
