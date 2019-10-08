import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDefaultStory } from '../base-components/BaseDefaultStory';

const WindowScroller = BaseDefaultStory;

configureStory(storiesOf('Window scroller', module)).add(
  'Minimal usage',
  () => <WindowScroller />,
);
