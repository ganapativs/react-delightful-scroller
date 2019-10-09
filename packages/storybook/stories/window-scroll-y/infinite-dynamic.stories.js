import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';

configureStory(storiesOf('Window scroller - y', module)).add(
  'Infinite scroll - dynamic height items',
  () => <BaseDynamicHeightInfinite axis="y" />,
);
