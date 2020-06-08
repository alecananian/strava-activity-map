import React from 'react';
import RideIcon from '@material-ui/icons/DirectionsBike';
import RunIcon from '@material-ui/icons/DirectionsRun';
import WalkIcon from '@material-ui/icons/DirectionsWalk';
import DefaultIcon from '@material-ui/icons/FitnessCenter';

import { ActivityType } from '~/types';

type Props = {
  type: ActivityType,
};

const ActivityIcon = ({ type }: Props) => {
  switch (type) {
    case ActivityType.Ride:
      return <RideIcon />;
    case ActivityType.Run:
      return <RunIcon />;
    case ActivityType.Walk:
      return <WalkIcon />;
    default:
      return <DefaultIcon />;
  }
};

export default ActivityIcon;
