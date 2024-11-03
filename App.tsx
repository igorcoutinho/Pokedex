import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import {ThemeProvider} from 'styled-components';

import theme from './src/global/styles/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
