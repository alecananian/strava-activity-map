import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import {
  FeatureGroup,
  Map,
  Polyline,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import type {
  Map as LeafletMap,
  LatLngTuple,
  LatLngBounds,
} from 'leaflet';
import {
  polyline as createPolyline,
  featureGroup as createFeatureGroup,
} from 'leaflet';
import PolylineUtil from 'polyline-encoded';
import useTheme from '@material-ui/styles/useTheme';
import type { Theme } from '@material-ui/core/styles/createMuiTheme';

import { useSettings } from '~/contexts/settings';
import { useStrava } from '~/contexts/strava';
import { ActivityType, MapType } from '~/types';
import { getMapTypeOptions } from '~/utils/map';

interface IHTMLMapElement {
  leafletElement: LeafletMap
}

const DefaultCenter: LatLngTuple = [34.0737, -118.3176];
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
  const mapRef = useRef<IHTMLMapElement | undefined>();
  const {
    state: {
      selectedActivity,
      activityTypeSettings,
      mapType,
    },
  } = useSettings();
  const {
    isAuthenticated,
    activities,
  } = useStrava();
  const theme: Theme = useTheme();

  const isHeatMap = useMemo(() => (
    [MapType.HeatMapLight, MapType.HeatMapDark].includes(mapType)
  ), [mapType]);

  const getColor = useCallback((type: ActivityType): string => (
    isHeatMap ? (
      theme.palette.primary.main
    ) : (
      activityTypeSettings[type]?.color || theme.palette.primary.main
    )
  ), [theme, isHeatMap, activityTypeSettings]);

  const visibileActivities = useMemo(() => (
    activities.filter(({ type, polyline }) => (
      polyline && !activityTypeSettings[type]?.hidden
    ))
  ), [activities, activityTypeSettings]);

  const mapTypeOptions = useMemo(() => getMapTypeOptions(mapType), [mapType]);

  const fitBounds = useCallback((bounds: LatLngBounds) => {
    if (mapRef && mapRef.current) {
      mapRef.current.leafletElement.fitBounds(bounds, {
        paddingTopLeft: [400, 0],
      });
    }
  }, [mapRef]);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const { maxZoom } = mapTypeOptions.options;
      if (maxZoom) {
        mapRef.current.leafletElement.setMaxZoom(maxZoom);
      }
    }
  }, [mapRef, mapTypeOptions]);

  useEffect(() => {
    if (selectedActivity) {
      fitBounds(createPolyline(PolylineUtil.decode(selectedActivity.polyline)).getBounds());
    }
  }, [fitBounds, selectedActivity]);

  useEffect(() => {
    if (activities.length > 0) {
      fitBounds(
        createFeatureGroup(
          activities.slice(0, 5).map(({ polyline }) => (
            createPolyline(PolylineUtil.decode(polyline))
          )),
        ).getBounds(),
      );
    }
  }, [fitBounds, activities]);

  return (
    <StyledMap
      ref={mapRef}
      center={isAuthenticated ? undefined : DefaultCenter}
      zoom={isAuthenticated ? undefined : DefaultZoom}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer {...mapTypeOptions} />
      <FeatureGroup>
        {visibileActivities.map(({ id, type, polyline }) => (
          <Polyline
            key={id}
            positions={PolylineUtil.decode(polyline)}
            color={getColor(type)}
            opacity={isHeatMap ? 0.2 : 1}
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
