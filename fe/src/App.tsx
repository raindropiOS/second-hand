import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@styles/GlobalStyles.style';
import { theme } from '@styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>
        <h2>Let's get started!</h2>
      </div>
    </ThemeProvider>
  );
};

export default App;
