import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
    options: {
      name: 'Delightful Scroller',
      showAddonPanel: true,
      theme: themes.dark,
    }
});

configure(require.context('../stories', true, /\.stories\.js$/), module);
