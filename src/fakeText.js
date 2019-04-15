import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// lorem.generateWords(1);
// lorem.generateSentences(5);
// lorem.generateParagraphs(7);

export default n => lorem.generateParagraphs(n);
