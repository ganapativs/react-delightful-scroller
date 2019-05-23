import styled from 'styled-components/macro';
import generateFakeText from './fakeText';

export const Container = styled.div`
  max-width: 700px;
  margin: 0px auto;
  padding-top: 10px;
`;

export const Card = styled.div`
  background: #fff;
  margin-bottom: 10px;
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

export const getItems = (count = 0) =>
  new Array(count)
    .fill(true)
    .map(() => generateFakeText(Math.ceil(Math.random() * 3)));
