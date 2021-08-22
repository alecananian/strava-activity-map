import React, { useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import StylesProvider from '@material-ui/styles/StylesProvider';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import createTheme from '@material-ui/core/styles/createTheme';

import '~/i18n';
import StravaProvider from '~/contexts/strava';
import { SettingsProvider } from '~/contexts/settings';
import { ThemeProvider, useTheme } from '~/contexts/theme';
import { StravaOrange } from '~/utils/color';
import MapView from '~/views/MapView';

const App = () => {
  const { state: { darkMode } } = useTheme();
  const theme = useMemo(() => (
    createTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: StravaOrange,
        },
      },
    })
  ), [darkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <StravaProvider>
          <SettingsProvider>
            <MapView />
          </SettingsProvider>
        </StravaProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default () => (
  <StylesProvider injectFirst>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StylesProvider>
);
