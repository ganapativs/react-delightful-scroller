import React from "react";

// eslint-disable-next-line no-unused-vars
export const RenderLoader = ({ items: i, itemsCount, batchSize }) => (
  <div style={{ textAlign: "center" }}>{`Loading page ${i.length / batchSize +
    1}...`}</div>
);
