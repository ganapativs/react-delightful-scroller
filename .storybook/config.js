import { addParameters, configure } from '@storybook/react';

addParameters({
    options: {
      name: 'React iScroller',
      showAddonPanel: false
    }
});

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
