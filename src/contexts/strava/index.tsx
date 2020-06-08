import React, { createContext, useContext } from 'react';

import type { IStravaAuthContext } from './auth';
import type { IStravaActivitiesContext } from './activities';
import StravaAuthProvider, { useStravaAuth } from './auth';
import StravaActivitiesProvider, { useStravaActivities } from './activities';

type TStravaContext = IStravaAuthContext & IStravaActivitiesContext;

interface IStravaProvider {
  children: React.ReactNode;
}

const StravaContext = createContext({} as TStravaContext);

export const useStrava = () => useContext(StravaContext);

const StravaProvider = ({ children }: { children: React.ReactNode }) => (
  <StravaContext.Provider
    value={{
      ...useStravaAuth(),
      ...useStravaActivities(),
    }}
  >
    {children}
  </StravaContext.Provider>
);

export default ({ children }: IStravaProvider) => (
  <StravaAuthProvider>
    <StravaActivitiesProvider>
      <StravaProvider>
        {children}
      </StravaProvider>
    </StravaActivitiesProvider>
  </StravaAuthProvider>
);
