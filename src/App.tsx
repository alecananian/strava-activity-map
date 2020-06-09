import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';

import '~/i18n';
import StravaProvider from '~/contexts/strava';
import { SettingsProvider } from '~/contexts/settings';
import { StravaOrange } from '~/utils/color';
import { MapView } from '~/views/MapView';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => (
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: StravaOrange,
        },
      },
    })
  ), [prefersDarkMode]);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <StravaProvider>
            <SettingsProvider>
              <MapView />
            </SettingsProvider>
          </StravaProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
