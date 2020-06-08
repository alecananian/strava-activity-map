import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import {
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import type { TActivityTypeSettings } from '~/types';
import type Activity from '~/models/activity';
import { DistanceUnit } from '~/types';
import { convertDistance } from '~/utils/distance';
import { displayTime } from '~/utils/time';

import { ActivityIcon } from '~/components/ActivityIcon';

type Props = {
  activities?: Activity[],
  activityTypeSettings?: TActivityTypeSettings,
  distanceUnits: DistanceUnit,
  onSelect: (activity: Activity) => void,
};

const ActivityIconWrapper = styled.div`
  margin: 0 auto;
`;

const ListItem = styled(MuiListItem)`${({ theme }) => `
  padding-right: ${theme.spacing(10)}px;
`}`;

const ActivityList = ({
  activities = [],
  activityTypeSettings = {},
  distanceUnits,
  onSelect,
}: Props) => {
  const { t } = useTranslation();
  const visibleActivities = activities.filter(({ type }) => (
    !activityTypeSettings[type]?.hidden
  ));
  return (
    <List>
      {visibleActivities.length > 0 ? (
        visibleActivities.map((activity) => (
          <ListItem
            key={activity.id}
            onClick={() => onSelect(activity)}
            dense
            button
            disableGutters
          >
            <ListItemIcon>
              <ActivityIconWrapper>
                <ActivityIcon type={activity.type} />
              </ActivityIconWrapper>
            </ListItemIcon>
            <ListItemText
              primary={activity.name}
              secondary={dayjs(activity.startDate).format('LLL')}
            />
            <ListItemSecondaryAction>
              <Typography variant="caption" display="block" align="right" color="textSecondary">
                {t('distance', {
                  context: distanceUnits,
                  value: convertDistance(activity.distance, distanceUnits).toFixed(2),
                })}
              </Typography>
              <Typography variant="caption" display="block" align="right" color="textSecondary">
                {displayTime(activity.movingTime)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <MuiListItem>
          <ListItemText
            primary="No activities found"
          />
        </MuiListItem>
      )}
    </List>
  );
};

export default ActivityList;
