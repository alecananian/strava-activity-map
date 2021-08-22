import type { IStravaActivity } from '~/types';

import api from '~/api';
import Activity from '~models/activity';
import {
  getCachedActivities,
  prependCachedActivities,
} from '~/utils/activity';
import { sleep } from '~/utils/time';

const MaxPerPage = 200;

const fetchActivities = async (
  page: number = 1,
  perPage: number = 30,
  after?: number,
): Promise<Activity[]> => {
  const results = await api.get('/athlete/activities', {
    params: {
      page,
      per_page: perPage,
      after,
    },
  }) as IStravaActivity[];
  return results.map((activity) => new Activity(activity));
};

export const fetchNewActivities = async (): Promise<Activity[]> => {
  const { lastSyncDate } = getCachedActivities();
  let activities: Activity[] = [];
  let complete = false;
  let page = 1;
  while (!complete) {
    // eslint-disable-next-line no-await-in-loop
    const results = await fetchActivities(page, MaxPerPage, lastSyncDate);
    activities = [
      ...activities,
      ...results.filter(({ polyline }) => polyline),
    ];
    complete = results.length < MaxPerPage || results.length === 0;
    if (!complete) {
      page += 1;
      // eslint-disable-next-line no-await-in-loop
      await sleep(500);
    }
  }
  prependCachedActivities(activities);
  return activities;
};
