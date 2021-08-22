import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnchor as SailIcon,
  faBiking as RideIcon,
  faDumbbell as DefaultIcon,
  faFutbol as SoccerIcon,
  faGolfBall as GolfIcon,
  faHiking as HikeIcon,
  faRunning as RunIcon,
  faSkating as IceSkateIcon,
  faSkiing as AlpineSkiIcon,
  faSkiingNordic as NordicSkiIcon,
  faSnowboarding as SnowboardIcon,
  faSwimmer as SwimIcon,
  faWalking as WalkIcon,
  faWheelchair as WheelchairIcon,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { ActivityType } from '~/types';

type Props = {
  type: ActivityType,
};

const IconMapping: Partial<Record<ActivityType, IconDefinition>> = {
  [ActivityType.AlpineSki]: AlpineSkiIcon,
  [ActivityType.EBikeRide]: RideIcon,
  [ActivityType.Golf]: GolfIcon,
  [ActivityType.Hike]: HikeIcon,
  [ActivityType.IceSkate]: IceSkateIcon,
  [ActivityType.NordicSki]: NordicSkiIcon,
  [ActivityType.Ride]: RideIcon,
  [ActivityType.Run]: RunIcon,
  [ActivityType.Sail]: SailIcon,
  [ActivityType.Snowboard]: SnowboardIcon,
  [ActivityType.Soccer]: SoccerIcon,
  [ActivityType.Swim]: SwimIcon,
  [ActivityType.VirtualRide]: RideIcon,
  [ActivityType.VirtualRun]: RunIcon,
  [ActivityType.Walk]: WalkIcon,
  [ActivityType.Wheelchair]: WheelchairIcon,
};

const ActivityIcon = ({ type }: Props) => (
  <FontAwesomeIcon icon={IconMapping[type] || DefaultIcon} size="lg" />
);

export default ActivityIcon;
