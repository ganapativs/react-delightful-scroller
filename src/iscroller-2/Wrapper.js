import React from 'react';

export const Wrapper = React.forwardRef(({ as = 'div', children }, ref) =>
  React.createElement(as, { ref }, children),
);
