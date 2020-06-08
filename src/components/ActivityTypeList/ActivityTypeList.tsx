import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction as MuiListItemSecondaryAction,
  ListItemText,
  Popover,
  Switch,
} from '@material-ui/core';

import { ColorDisplay } from '~/components/ColorDisplay';
import type { ActivityType, TActivityTypeSettings } from '~/types';
import type Activity from '~/models/activity';
import { DistanceUnit } from '~/types';
import {
  useSettings,
  setActivityTypeColorAction,
} from '~/contexts/settings';
import {
  getUniqueActivityTypes,
  getCountForActivityType,
  getTotalDistanceForActivityType,
} from '~/utils/activity';
import { convertDistance } from '~/utils/distance';

type Props = {
  activities?: Activity[],
  activityTypeSettings?: TActivityTypeSettings,
  distanceUnits: DistanceUnit,
  canSelectColor?: boolean,
  onToggleActivityType: (type: ActivityType) => void,
};

const ListItemSecondaryAction = styled(MuiListItemSecondaryAction)`${({ theme }) => `
  right: ${theme.spacing(1)}px;
`}`;

const ActivityTypeList = ({
  activities = [],
  activityTypeSettings = {},
  distanceUnits,
  canSelectColor = true,
  onToggleActivityType,
}: Props) => {
  const [color, setColor] = useState<string>();
  const [colorType, setColorType] = useState<ActivityType>();
  const [pickerAnchorEl, setPickerAnchorEl] = useState<HTMLDivElement | undefined>();
  const { dispatch } = useSettings();
  const { t } = useTranslation();
  return (
    <>
      <List>
        {getUniqueActivityTypes(activities).map((type) => (
          <ListItem
            key={type}
            dense
            disableGutters
          >
            <ListItemIcon>
              {canSelectColor && (
                <ColorDisplay
                  color={activityTypeSettings[type]?.color}
                  onClick={(e) => {
                    setColor(activityTypeSettings[type]?.color);
                    setColorType(type);
                    setPickerAnchorEl(e.currentTarget);
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={type}
              secondary={t('activityTypeDetails', {
                activityCount: getCountForActivityType(activities, type),
                distance: t('distance', {
                  context: distanceUnits,
                  value: convertDistance(
                    getTotalDistanceForActivityType(activities, type),
                    distanceUnits,
                  ).toFixed(2),
                }),
              })}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={!activityTypeSettings[type]?.hidden}
                onChange={() => onToggleActivityType(type)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Popover
        open={!!pickerAnchorEl}
        anchorEl={pickerAnchorEl}
        onClose={() => setPickerAnchorEl(undefined)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ChromePicker
          color={color}
          onChange={({ hex }) => setColor(hex)}
          onChangeComplete={({ hex }) => dispatch(setActivityTypeColorAction(colorType!, hex))}
        />
      </Popover>
    </>
  );
};

export default ActivityTypeList;
