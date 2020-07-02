import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import LightModeIcon from '@material-ui/icons/Brightness7';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import ActivityList from '~/components/ActivityList';
import ActivityTypeList from '~/components/ActivityTypeList';
import MapTypeList from '~/components/MapTypeList';
import ButtonSelect from '~/components/ButtonSelect';
import {
  useSettings,
  setSelectedActivityAction,
  toggleActivityTypeAction,
  setMapTypeAction,
  setDistanceUnitsAction,
} from '~/contexts/settings';
import { useTheme, toggleDarkModeAction } from '~/contexts/theme';
import { useStrava } from '~/contexts/strava';
import type { ActivityType } from '~/types';
import type Activity from '~/models/activity';
import { MapType, DistanceUnit } from '~/types';
import { getAvailableLanguages } from '~/utils/i18n';
import MenuButton from './MenuButton';
import LanguageMenuButton from './LanguageMenuButton';

const MenuContainer = styled.div<{ open: boolean }>`${({ theme, open }) => `
  position: absolute;
  z-index: 2;
  top: ${theme.spacing(1)}px;
  left: ${open ? theme.spacing(1) : -(350 - theme.spacing(1))}px;
  bottom: ${theme.spacing(1)}px;
  width: 400px;
  display: flex;
  transition: left 0.25s;
`}`;

const MenuInner = styled(Grid)`
  height: 100%;
  flex-wrap: nowrap;
`;

const MapSettingsContainer = styled(Paper)`
  border-top-right-radius: 0;
`;

const ActivityListContainer = styled(Grid)`
  flex: 1;
  overflow: scroll;
`;

const MenuButtonContainer = styled.div`${({ theme }) => `
  width: ${theme.spacing(1) + 50}px;
  margin-left: ${theme.spacing(1)}px;
`}`;

const SliderButton = styled(MenuButton)`${({ theme }) => `
  margin-left: ${theme.spacing(-1)}px;
  padding-right: 0;
  width: ${theme.spacing(1) + 50}px;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`}`;

const OptionsMenu = () => {
  const [open, setOpen] = useState(true);
  const {
    state: {
      activityTypeSettings,
      mapType,
      distanceUnits,
    },
    dispatch,
  } = useSettings();
  const {
    state: {
      darkMode,
    },
    dispatch: dispatchTheme,
  } = useTheme();
  const {
    isAuthenticated,
    logOut,
    activities,
  } = useStrava();
  const { t } = useTranslation();

  const handleChangeMapType = useCallback((type: MapType) => {
    dispatch(setMapTypeAction(type));
  }, [dispatch]);

  const handleChangeDistanceUnits = useCallback((value: string) => {
    dispatch(setDistanceUnitsAction(value as DistanceUnit));
  }, []);

  const handleToggleActivityType = useCallback((type: ActivityType) => {
    dispatch(toggleActivityTypeAction(type));
  }, [dispatch]);

  const handleSelectActivity = useCallback((activity: Activity) => {
    dispatch(setSelectedActivityAction(activity));
  }, [dispatch]);

  const handleToggleDarkMode = useCallback(() => {
    dispatchTheme(toggleDarkModeAction());
  }, [dispatchTheme]);

  return (
    <>
      <MenuContainer open={open}>
        <MenuInner
          container
          direction="column"
          spacing={1}
        >
          <Grid item>
            <Box component={MapSettingsContainer} p={1}>
              <MapTypeList
                selectedMapType={mapType}
                onChange={handleChangeMapType}
              />
              <Box mt={1}>
                <ButtonSelect
                  options={[
                    [DistanceUnit.Miles, t('distanceUnit', { context: DistanceUnit.Miles })],
                    [DistanceUnit.Kilometers, t('distanceUnit', { context: DistanceUnit.Kilometers })],
                  ]}
                  value={distanceUnits}
                  onChange={handleChangeDistanceUnits}
                />
              </Box>
            </Box>
          </Grid>
          {isAuthenticated && (
            <>
              {activities.length > 0 && (
                <Grid item>
                  <Paper>
                    <ActivityTypeList
                      activities={activities}
                      activityTypeSettings={activityTypeSettings}
                      distanceUnits={distanceUnits}
                      canSelectColor={(
                        ![MapType.HeatMapLight, MapType.HeatMapDark].includes(mapType)
                      )}
                      onToggleActivityType={handleToggleActivityType}
                    />
                  </Paper>
                </Grid>
              )}
              <ActivityListContainer item>
                <Paper>
                  <ActivityList
                    activities={activities}
                    activityTypeSettings={activityTypeSettings}
                    distanceUnits={distanceUnits}
                    onSelect={handleSelectActivity}
                  />
                </Paper>
              </ActivityListContainer>
            </>
          )}
        </MenuInner>
        <MenuButtonContainer>
          {open ? (
            <Tooltip title={t('menu.close') as string} placement="right" arrow>
              <SliderButton
                variant="contained"
                onClick={() => setOpen(false)}
                disableElevation
              >
                <CloseIcon />
              </SliderButton>
            </Tooltip>
          ) : (
            <Tooltip title={t('menu.open') as string} placement="right" arrow>
              <MenuButton
                variant="contained"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </MenuButton>
            </Tooltip>
          )}
          {getAvailableLanguages().length > 1 && (
            <Tooltip title={t('menu.language') as string} placement="right" arrow>
              <Box>
                <LanguageMenuButton />
              </Box>
            </Tooltip>
          )}
          <Tooltip
            title={t(darkMode ? 'menu.lightMode' : 'menu.darkMode') as string}
            placement="right"
            arrow
          >
            <MenuButton
              variant="contained"
              onClick={handleToggleDarkMode}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </MenuButton>
          </Tooltip>
          {isAuthenticated && (
            <Tooltip title={t('menu.logOut') as string} placement="right" arrow>
              <MenuButton
                variant="contained"
                onClick={logOut}
              >
                <LogOutIcon />
              </MenuButton>
            </Tooltip>
          )}
        </MenuButtonContainer>
      </MenuContainer>
    </>
  );
};

export default OptionsMenu;
