import React from 'react';

const IScrollerContext = React.createContext({});

export const IScrollerProvider = IScrollerContext.Provider;
export const IScrollerConsumer = IScrollerContext.Consumer;
export default IScrollerContext;
