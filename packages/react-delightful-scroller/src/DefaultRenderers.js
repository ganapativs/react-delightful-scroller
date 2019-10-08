import React from 'react';

export const DefaultRenderContainer = ({ children, forwardRef }) => (
  <div ref={forwardRef}>{children}</div>
);

DefaultRenderContainer.displayName = 'DefaultRenderContainer';

// eslint-disable-next-line no-unused-vars
export const DefaultRenderItem = ({ item, index }) => item;

DefaultRenderItem.displayName = 'DefaultRenderItem';

// eslint-disable-next-line no-unused-vars
export const DefaultRenderLoader = ({ items, itemsCount, batchSize }) => null;

DefaultRenderLoader.displayName = 'DefaultRenderLoader';
