import React from "react";
import styled from "styled-components/macro";

export const Loader = styled.div`
  text-align: center;
  color: #fff;
`;

// eslint-disable-next-line no-unused-vars
export const RenderLoader = ({ size, itemsCount, batchSize }) => (
  <Loader>{`Loading page ${size / batchSize + 1}...`}</Loader>
);
