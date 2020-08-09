import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { prefersDarkMode } from '~/utils/theme';
import {
  CacheKey,
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '~/utils/localStorage';

enum ActionType {
  ToggleDarkMode = 'TOGGLE_DARK_MODE',
}

type State = {
  darkMode: boolean,
};

const InitialState: State = getJSONFromLocalStorage(CacheKey.ThemeContext) || {
  darkMode: prefersDarkMode(),
};

interface Action {
  type: ActionType
}

type ContextProps = {
  state: State,
  dispatch: React.Dispatch<Action>,
};

const ThemeContext = createContext({} as ContextProps);

export const useTheme = () => useContext(ThemeContext);

export const toggleDarkModeAction = (): Action => ({
  type: ActionType.ToggleDarkMode,
});

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  if (type === ActionType.ToggleDarkMode) {
    return {
      ...state,
      darkMode: !state.darkMode,
    };
  }

  throw new Error(`Unknown action type for ThemeContext: ${type}`);
};

export const ThemeProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    setJSONToLocalStorage(CacheKey.ThemeContext, state);
  }, [state]);

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        state,
        dispatch,
      }}
    />
  );
};
