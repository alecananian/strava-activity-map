import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import type { TActivityTypeSettings } from '~/types';
import type Activity from '~/models/activity';
import { ActivityType, DistanceUnit, MapType } from '~/types';
import { getDefaultActivityTypeSettings } from '~/utils/activity';
import { getDefaultDistanceUnits } from '~/utils/distance';
import {
  CacheKey,
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '~/utils/localStorage';
import { prefersDarkMode } from '~/utils/theme';

enum ActionType {
  SetSelectedActivity = 'SET_SELECTED_ACTIVITY',
  ToggleActivityType = 'TOGGLE_ACTIVITY_TYPE',
  SetActivityTypeColor = 'SET_ACTIVIT_TYPE_COLOR',
  SetMapType = 'SET_MAP_STYLE',
  SetDistanceUnit = 'SET_DISTANCE_UNIT',
}

type State = {
  selectedActivity?: Activity,
  activityTypeSettings: TActivityTypeSettings,
  mapType: MapType,
  distanceUnits: DistanceUnit,
};

const InitialState: State = getJSONFromLocalStorage(CacheKey.SettingsContext) || {
  activityTypeSettings: getDefaultActivityTypeSettings(),
  mapType: prefersDarkMode() ? MapType.HeatMapDark : MapType.HeatMapLight,
  distanceUnits: getDefaultDistanceUnits(),
};

interface Action {
  type: ActionType
}

interface WithActivityAction extends Action {
  payload?: Activity
}

interface WithActivityTypeAction extends Action {
  payload: ActivityType
}

interface WithActivityTypeColorAction extends Action {
  payload: {
    activityType: ActivityType,
    color: string,
  },
}

interface WithMapTypeAction extends Action {
  payload: MapType
}

interface WithDistanceUnitAction extends Action {
  payload: DistanceUnit
}

type ContextAction = (
  WithActivityAction
  | WithActivityTypeAction
  | WithActivityTypeColorAction
  | WithMapTypeAction
  | WithDistanceUnitAction
);

type ContextProps = {
  state: State,
  dispatch: React.Dispatch<ContextAction>,
};

const SettingsContext = createContext({} as ContextProps);

export const useSettings = () => useContext(SettingsContext);

export const setSelectedActivityAction = (payload?: Activity): WithActivityAction => ({
  type: ActionType.SetSelectedActivity,
  payload,
});

export const toggleActivityTypeAction = (payload: ActivityType): WithActivityTypeAction => ({
  type: ActionType.ToggleActivityType,
  payload,
});

export const setActivityTypeColorAction = (
  activityType: ActivityType,
  color: string,
): WithActivityTypeColorAction => ({
  type: ActionType.SetActivityTypeColor,
  payload: { activityType, color },
});

export const setMapTypeAction = (payload: MapType): WithMapTypeAction => ({
  type: ActionType.SetMapType,
  payload,
});

export const setDistanceUnitsAction = (payload: DistanceUnit): WithDistanceUnitAction => ({
  type: ActionType.SetDistanceUnit,
  payload,
});

const reducer = (state: State, action: ContextAction): State => {
  const { type } = action;
  switch (type) {
    case ActionType.SetSelectedActivity:
      return {
        ...state,
        selectedActivity: (action as WithActivityAction).payload,
      };

    case ActionType.ToggleActivityType: {
      const nextActivityTypeSettings = { ...state.activityTypeSettings };
      const typeSetting = nextActivityTypeSettings[(action as WithActivityTypeAction).payload];
      if (typeSetting) {
        typeSetting!.hidden = !typeSetting!.hidden;
      }

      return {
        ...state,
        activityTypeSettings: nextActivityTypeSettings,
      };
    }

    case ActionType.SetActivityTypeColor: {
      const nextActivityTypeSettings = { ...state.activityTypeSettings };
      const { activityType, color } = (action as WithActivityTypeColorAction).payload;
      const typeSetting = nextActivityTypeSettings[activityType];
      if (typeSetting) {
        typeSetting!.color = color;
      }

      return {
        ...state,
        activityTypeSettings: nextActivityTypeSettings,
      };
    }

    case ActionType.SetMapType:
      return {
        ...state,
        mapType: (action as WithMapTypeAction).payload,
      };

    case ActionType.SetDistanceUnit:
      return {
        ...state,
        distanceUnits: (action as WithDistanceUnitAction).payload,
      };

    default:
      throw new Error(`Unknown action type for SettingsContext: ${type}`);
  }
};

export const SettingsProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    const cachedState = { ...state };
    delete cachedState.selectedActivity;
    setJSONToLocalStorage(CacheKey.SettingsContext, cachedState);
  }, [state]);

  return (
    <SettingsContext.Provider
      {...props}
      value={{
        state,
        dispatch,
      }}
    />
  );
};
