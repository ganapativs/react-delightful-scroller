import React from "react";
import styled from "styled-components/macro";
import { Warning } from "./Warning";

const BaseContainer = styled.div`
  max-width: 700px;
  margin: 0px auto;
  padding: 10px 0;

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;

export const Container = ({ children }) => {
  return (
    <BaseContainer>
      <Warning>{children}</Warning>
    </BaseContainer>
  );
};
