import React from 'react';
import styled from 'styled-components/macro';
import { Warning } from './Warning';

const BaseContainer = styled.div`
  max-width: ${props => (props.axis === 'y' ? '700px' : null)};
  margin: 0px auto;
  padding: 10px 0;

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;

export const Container = ({ axis, children }) => {
  return (
    <BaseContainer axis={axis}>
      <Warning>{children}</Warning>
    </BaseContainer>
  );
};
