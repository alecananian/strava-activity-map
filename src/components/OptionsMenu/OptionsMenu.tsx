import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import i18n from 'i18next';
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
import LanguageIcon from '@material-ui/icons/Translate';

import ActivityList from '~/components/ActivityList';
import ActivityTypeList from '~/components/ActivityTypeList';
import MapTypeList from '~/components/MapTypeList';
import LocalizationSettingsDialog from '~/components/LocalizationSettingsDialog';
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
import { getAvailableLanguages, changeLanguage } from '~/utils/i18n';
import MenuButton from './MenuButton';

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
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
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

  const handleSaveLocalizationSettings = useCallback((language: string, units: DistanceUnit) => {
    changeLanguage(language);
    dispatch(setDistanceUnitsAction(units));
    setSettingsDialogOpen(false);
  }, [dispatch]);

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
            <Tooltip title={t('menu.localizationSettings') as string} placement="right" arrow>
              <MenuButton
                variant="contained"
                onClick={() => setSettingsDialogOpen(true)}
              >
                <LanguageIcon />
              </MenuButton>
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
      <LocalizationSettingsDialog
        language={i18n.language}
        units={distanceUnits}
        onSave={handleSaveLocalizationSettings}
        onCancel={() => setSettingsDialogOpen(false)}
        onClose={() => setSettingsDialogOpen(false)}
        open={settingsDialogOpen}
      />
    </>
  );
};

export default OptionsMenu;
