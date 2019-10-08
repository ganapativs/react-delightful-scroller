import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';

const WindowScroller = BaseDynamicHeightInfinite;

configureStory(storiesOf('Window scroller', module)).add(
  'Infinite scroll - dynamic height items',
  () => <WindowScroller />,
);
