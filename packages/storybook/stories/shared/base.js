import { withKnobs } from "@storybook/addon-knobs";
import { withSmartKnobs } from "storybook-addon-smart-knobs";
import { addReadme } from "storybook-readme";
import DelightfulReadme from "../../../../README.md";

export const configureStory = m =>
  m
    .addDecorator(withSmartKnobs)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({
      readme: {
        sidebar: DelightfulReadme
      }
    });
