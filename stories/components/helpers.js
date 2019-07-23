import styled from 'styled-components/macro';
import gradient from 'random-gradient';
import generateFakeText from './fakeText';

export const Container = styled.div`
  max-width: 700px;
  margin: 0px auto;
  padding: 10px 0;

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;

export const Card = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  white-space: pre-line;
  color: #fff;
  background: #607d8b;
`;

export const getRandomColor = () =>
  '#' + ((Math.random() * 0xffffff) << 0).toString(16);

export const getItems = (count = 0) =>
  new Array(count).fill(true).map(() => {
    const text = generateFakeText(Math.ceil(Math.random() * 3));

    return {
      text,
      gradient: gradient(text),
    };
  });
