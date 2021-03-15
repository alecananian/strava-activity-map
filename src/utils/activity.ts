import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';

import type { IActivitiesCache, TActivityTypeSettings } from '~/types';
import { ActivityType } from '~/types';
import type Activity from '~/models/activity';
import { StravaOrange, stringToColor } from '~/utils/color';
import {
  CacheKey,
  getJSONFromLocalStorage,
  setJSONToLocalStorage,
} from '~/utils/localStorage';

const CustomActivityTypeColors: Partial<Record<ActivityType, string>> = {
  [ActivityType.Hike]: indigo[400],
  [ActivityType.Ride]: StravaOrange,
  [ActivityType.Run]: deepPurple[400],
  [ActivityType.Walk]: blue[400],
};

export const getUniqueActivityTypes = (activies: Activity[]): ActivityType[] => (
  [...new Set(activies.map(({ type }) => type))].sort()
);

export const getActivitiesByType = (activities: Activity[], type: ActivityType): Activity[] => (
  activities.filter((activity) => activity.type === type)
);

export const getCountForActivityType = (activities: Activity[], type: ActivityType): number => (
  getActivitiesByType(activities, type).length
);

export const getTotalDistanceForActivityType = (
  activities: Activity[],
  type: ActivityType,
): number => (
  getActivitiesByType(activities, type).reduce((total, { distance }) => (
    total + distance
  ), 0)
);

export const getCachedActivities = (): IActivitiesCache => (
  getJSONFromLocalStorage(CacheKey.Activities) || {
    activities: [],
  }
);

export const setCachedActivities = (activities: Activity[]) => (
  setJSONToLocalStorage(CacheKey.Activities, {
    activities,
    lastSyncDate: Math.ceil(Date.now() / 1000),
  })
);

export const prependCachedActivities = (activities: Activity[]) => {
  if (activities.length > 0) {
    const { activities: cachedActivities } = getCachedActivities();
    setCachedActivities([
      ...activities,
      ...cachedActivities,
    ]);
  }
};

export const getDefaultActivityTypeSettings = (): TActivityTypeSettings => (
  Object.values(ActivityType).reduce((settings, type) => ({
    ...settings,
    [type]: {
      color: CustomActivityTypeColors[type] || stringToColor(type),
      hidden: false,
    },
  }), {}) as TActivityTypeSettings
);
