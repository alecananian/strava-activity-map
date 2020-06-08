import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import {
  logIn,
  getAuthTokenByCode,
} from '~/api/auth';
import User from '~/models/user';
import { logOut } from '~/utils/auth';
import { getQueryParams } from '~/utils/url';

export interface IStravaAuthContext {
  isAuthenticated: boolean;
  user?: User;
  logIn(): void;
  logOut(): void;
}

export interface IStravaAuthProvider {
  children: React.ReactNode;
}

const StravaAuthContext = createContext({} as IStravaAuthContext);

export const useStravaAuth = () => useContext(StravaAuthContext);

const StravaAuthProvider = ({ children }: IStravaAuthProvider) => {
  const [user, setUser] = useState<User | undefined>(User.getFromCache());

  const detectUser = useCallback(async () => {
    const { code } = getQueryParams();
    if (code) {
      const result = await getAuthTokenByCode(code);
      if (result && result.athlete) {
        setUser(new User(result.athlete));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      User.saveToCache(user);
    } else {
      User.clearCache();
      detectUser();
    }
  }, [user, detectUser]);

  return (
    <StravaAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        logIn: () => logIn(),
        logOut: () => logOut(),
      }}
    >
      {children}
    </StravaAuthContext.Provider>
  );
};

export default StravaAuthProvider;
