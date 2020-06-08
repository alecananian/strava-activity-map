import type { ActivityType, IActivitiesCache } from '~/types';
import type Activity from '~/models/activity';
import {
  CacheKey,
  getJSONFromLocalStorage,
  setJSONToLocalStorage,
} from '~/utils/localStorage';

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
