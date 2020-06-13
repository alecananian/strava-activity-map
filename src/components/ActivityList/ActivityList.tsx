import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

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
