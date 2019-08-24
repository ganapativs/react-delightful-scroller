import React from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #111;
  padding: 10px;
  margin: 30px;
`;

export const CustomScrollContainer = React.forwardRef(
  ({ children, style }, ref) => {
    return (
      <Wrapper style={style} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);

CustomScrollContainer.displayName = "CustomScrollContainer";
