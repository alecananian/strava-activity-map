import React from 'react';
import {
  Grid,
} from '@material-ui/core';

import MapTypeCard from './MapTypeCard';
import { MapType } from '~/types';

type Props = {
  selectedMapType: MapType,
  onChange: (type: MapType) => void,
};

const MapTypeList = ({
  selectedMapType,
  onChange,
}: Props) => (
  <Grid container>
    {[
      MapType.Map,
      MapType.Satellite,
      MapType.HeatMapLight,
      MapType.HeatMapDark,
    ].map((type: MapType) => (
      <Grid item key={type} md={3}>
        <MapTypeCard
          type={type}
          selected={type === selectedMapType}
          onClick={() => onChange(type)}
        />
      </Grid>
    ))}
  </Grid>
);

export default MapTypeList;