import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDefaultStory } from '../base-components/BaseDefaultStory';

configureStory(storiesOf('Window scroller - x', module)).add(
  'Minimal usage',
  () => <BaseDefaultStory axis="x" />,
);
