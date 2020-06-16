import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';

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
import { convertDistance, formatNumber } from '~/utils/distance';

type Props = {
  activities?: Activity[],
  activityTypeSettings?: Partial<TActivityTypeSettings>,
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
              primary={t('activityType', type, { context: type })}
              secondary={t('activityTypeDetails', {
                activityCount: getCountForActivityType(activities, type),
                distance: t('distance', {
                  context: distanceUnits,
                  value: formatNumber(
                    convertDistance(
                      getTotalDistanceForActivityType(activities, type),
                      distanceUnits,
                    ),
                  ),
                }),
              })}
            />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
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
