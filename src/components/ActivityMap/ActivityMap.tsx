/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
  FeatureGroup,
  Map,
  Polyline,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import PolylineUtil from 'polyline-encoded';
import useTheme from '@material-ui/styles/useTheme';
import type { Theme } from '@material-ui/core/styles/createMuiTheme';

import {
  useSettings,
  // setSelectedActivityAction,
} from '~/contexts/settings';
import { useStrava } from '~/contexts/strava';
import { ActivityType, MapType } from '~/types';
import { getMapTypeOptions } from '~/utils/map';

const DefaultCenter: L.LatLngTuple = [34.0737, -118.3176];
const DefaultZoom = 12;

const StyledMap = styled(Map)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const ActivityMap = () => {
  const {
    state: {
      selectedActivity,
      activityTypeSettings,
      mapType,
    },
    dispatch,
  } = useSettings();
  const {
    isAuthenticated,
    activities,
  } = useStrava();
  const theme: Theme = useTheme();

  const getColor = useCallback((type: ActivityType): string => {
    if (mapType === MapType.HeatMapLight) {
      return theme.palette.primary.main;
    }

    if (mapType === MapType.HeatMapDark) {
      return '#fff';
    }

    return activityTypeSettings[type]?.color || theme.palette.primary.main;
  }, [theme, mapType, activityTypeSettings]);

  const onViewportChanged = useCallback(() => {
    // dispatch(setSelectedActivityAction());
  }, [dispatch]);

  const opacity = useMemo(() => (
    [MapType.HeatMapLight, MapType.HeatMapDark].includes(mapType) ? 0.3 : 1
  ), [mapType]);

  const visibileActivities = useMemo(() => (
    activities.filter(({ type, polyline }) => (
      polyline && !activityTypeSettings[type]?.hidden
    ))
  ), [activities, activityTypeSettings]);

  const bounds = useMemo(() => {
    if (selectedActivity) {
      return L.polyline(PolylineUtil.decode(selectedActivity.polyline)).getBounds();
    }

    if (activities.length > 0) {
      return L.featureGroup(
        activities.slice(0, 5).map(({ polyline }) => (
          L.polyline(PolylineUtil.decode(polyline))
        )),
      ).getBounds();
    }

    return undefined;
  }, [selectedActivity, activities]);

  return (
    <StyledMap
      center={isAuthenticated ? undefined : DefaultCenter}
      zoom={isAuthenticated ? undefined : DefaultZoom}
      zoomControl={false}
      bounds={bounds}
      boundsOptions={{
        paddingTopLeft: [400, 0],
      }}
      onViewportChanged={onViewportChanged}
    >
      <ZoomControl position="topright" />
      <TileLayer {...getMapTypeOptions(mapType)} />
      <FeatureGroup>
        {visibileActivities.map(({ id, type, polyline }) => (
          <Polyline
            key={id}
            positions={PolylineUtil.decode(polyline)}
            color={getColor(type)}
            opacity={opacity}
            interactive={false}
            options={{
              smoothFactor: 2,
            }}
          />
        ))}
      </FeatureGroup>
    </StyledMap>
  );
};

export default ActivityMap;
