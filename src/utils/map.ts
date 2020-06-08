import { MapType } from '~/types';

type MapTypeMapping = {
  tileLayerUrl: string,
};

const Mappings: { [key in MapType]: MapTypeMapping } = {
  [MapType.Map]: {
    tileLayerUrl: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  },
  [MapType.Satellite]: {
    tileLayerUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  [MapType.HeatMapLight]: {
    tileLayerUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  },
  [MapType.HeatMapDark]: {
    tileLayerUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  },
};

const MapTypeSampleX = '2809';
const MapTypeSampleY = '6539';
const MapTypeSampleZ = '14';

export const getMapTypeTileLayerUrl = (type: MapType): string => Mappings[type].tileLayerUrl;

export const getMapTypeThumbnailImageUrl = (type: MapType): string => (
  getMapTypeTileLayerUrl(type)
    .replace('{x}', MapTypeSampleX)
    .replace('{y}', MapTypeSampleY)
    .replace('{z}', MapTypeSampleZ)
);
