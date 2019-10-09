import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfiniteAnimated } from '../base-components/BaseDynamicHeightInfiniteAnimated';

configureStory(storiesOf('Window scroller - y', module)).add(
  'Infinite scroll - animated dynamic height items',
  () => <BaseDynamicHeightInfiniteAnimated axis="y" />,
);
