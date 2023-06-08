import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../src/styles/GlobalStyles.style';
import { theme } from '../src/styles/theme';

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
