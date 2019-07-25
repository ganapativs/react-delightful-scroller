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
  position: relative;
  z-index: 0;
  overflow: hidden;
  line-height: 24px;
`;

export const Input = styled.input`
  background: rgba(37, 36, 36, 0.1);
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  transition: background 0.2s ease-out;
`;

export const DarkLayer = styled.div`
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(43, 33, 78, 0.75);
    left: 0;
    top: 0;
    z-index: -1;
    transition: all 0.2s ease-out;
  }

  &:hover :before {
    opacity: 0.4;
    transition: all 0.4s ease-in;
  }

  &:hover ${Input} {
    background: rgba(37, 36, 36, 0.3);
    transition: background 0.4s ease-in;
  }
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
