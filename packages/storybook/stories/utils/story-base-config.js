import { addReadme } from 'storybook-readme';
import DelightfulReadme from '../../../../README.md';

export const decorators = [addReadme];

export const parameters = {
  readme: {
    sidebar: DelightfulReadme,
  },
};
