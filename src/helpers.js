import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 700px;
  margin: 0px auto;
`;

export const Card = styled.div`
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  box-shadow: 0 1px 4px #ddd;
  white-space: pre-line;
  transform: translateY(0);
  transition: all 0.1s ease-out;

  &:hover {
    box-shadow: 0 4px 8px #ccc;
    transform: translateY(-3px);
    transition: all 0.2s ease-in;
  }
`;

export const getRandomColor = () =>
  '#' + ((Math.random() * 0xffffff) << 0).toString(16);
