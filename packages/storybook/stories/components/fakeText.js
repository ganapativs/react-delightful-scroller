import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export default n => lorem.generateParagraphs(n);

export const generateWords = n => lorem.generateWords(5);

export const generateSentences = n => lorem.generateSentences(5);
