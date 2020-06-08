import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { fetchNewActivities } from '~/api/activities';
import { useStravaAuth } from '~/contexts/strava/auth';
import Activity from '~/models/activity';
import { getCachedActivities } from '~/utils/activity';

export interface IStravaActivitiesContext {
  activities: Activity[];
}

export interface IStravaActivitiesProvider {
  children: React.ReactNode;
}

const StravaActivitiesContext = createContext({} as IStravaActivitiesContext);

export const useStravaActivities = () => useContext(StravaActivitiesContext);

const StravaActivitiesProvider = ({ children }: IStravaActivitiesProvider) => {
  const [activities, setActivities] = useState<Activity[]>(getCachedActivities().activities);
  const { isAuthenticated } = useStravaAuth();

  const fetchActivities = useCallback(async () => {
    const newActivities = await fetchNewActivities();
    if (newActivities.length > 0) {
      setActivities((currentActivities) => [
        ...newActivities,
        ...currentActivities,
      ]);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchActivities();
    } else {
      setActivities([]);
    }
  }, [isAuthenticated]);

  return (
    <StravaActivitiesContext.Provider
      value={{
        activities,
      }}
    >
      {children}
    </StravaActivitiesContext.Provider>
  );
};

export default StravaActivitiesProvider;
