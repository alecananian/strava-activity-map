import { MapType } from '~/types';

interface IMapTypeOptions {
  url: string
  attribution: string
  options: {
    maxZoom?: number
  }
}

const MapTypeOptions: Record<MapType, IMapTypeOptions> = {
  [MapType.HeatMapLight]: {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin, &copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors, and the GIS user community',
    options: {
      maxZoom: 16,
    },
  },
  [MapType.HeatMapDark]: {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin, &copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors, and the GIS user community',
    options: {
      maxZoom: 16,
    },
  },
  [MapType.Map]: {
    url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    options: {
      maxZoom: 20,
    },
  },
  [MapType.Satellite]: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community',
    options: {
      maxZoom: 18,
    },
  },
};

const MapTypeSampleX = '2809';
const MapTypeSampleY = '6539';
const MapTypeSampleZ = '14';

export const getMapTypeOptions = (type: MapType): IMapTypeOptions => MapTypeOptions[type];

export const getMapTypeThumbnailImageUrl = (type: MapType): string => (
  getMapTypeOptions(type).url
    .replace('{x}', MapTypeSampleX)
    .replace('{y}', MapTypeSampleY)
    .replace('{z}', MapTypeSampleZ)
);
