import React from 'react';
import GlobalStyles from '../src/styles/GlobalStyles.style';

import type { Preview, composeStory } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  Story => (
    <React.Fragment>
      <GlobalStyles />
      <Story />
    </React.Fragment>
  ),
];

export default preview;
