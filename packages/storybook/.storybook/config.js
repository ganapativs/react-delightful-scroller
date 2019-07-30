import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
    options: {
      name: 'Delightful Scroller',
      showAddonPanel: true,
      theme: themes.dark,
    }
});

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
