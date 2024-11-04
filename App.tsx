import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import {ThemeProvider} from 'styled-components';

import theme from './src/global/styles/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
