import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseFixedHeightInfinite } from '../base-components/BaseFixedHeightInfinite';

const WindowScroller = BaseFixedHeightInfinite;

configureStory(storiesOf('Window scroller', module)).add(
  'Infinite scroll - fixed height items',
  () => <WindowScroller />,
);
