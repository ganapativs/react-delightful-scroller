import styled from "styled-components/macro";
import faker from "faker";

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
  white-space: pre-line;
  background: var(--darkGrey);
  position: relative;
  z-index: 0;
  overflow: hidden;
  line-height: 24px;
  border-bottom: 4px solid var(--darkYellow);
`;

export const getItems = (count = 0, editable = true) =>
  new Array(count).fill(true).map(() => {
    return {
      phrase: faker.hacker.phrase(),
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      company: faker.company.companyName(),
      following: faker.random.boolean(),
      editable
    };
  });
