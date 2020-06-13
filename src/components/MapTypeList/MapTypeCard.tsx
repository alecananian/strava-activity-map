import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { MapType } from '~/types';
import { getMapTypeThumbnailImageUrl } from '~/utils/map';

type Props = {
  type: MapType,
  selected: boolean,
  onClick: () => void,
};

const CardContainer = styled.div`${({ theme }) => `
  text-align: center;
  cursor: pointer;
  padding: ${theme.spacing(1)}px;
  border-radius: ${theme.spacing(1)}px;
  &:hover {
    background-color: ${theme.palette.action.hover};
  }
`}`;

const ImageThumbnail = styled.img`${({ theme }) => `
  height: 50px;
  border: 1px solid ${theme.palette.divider};
`}`;

const MapTypeCard = ({
  type,
  selected = true,
  onClick,
}: Props) => {
  const { t } = useTranslation();
  return (
    <CardContainer onClick={onClick}>
      <ImageThumbnail
        src={getMapTypeThumbnailImageUrl(type)}
      />
      <Typography variant="body2" component="div">
        <Box fontWeight={selected ? 'fontWeightMedium' : 'fontWeightLight'}>
          {t('mapType', { context: type })}
        </Box>
      </Typography>
    </CardContainer>
  );
};

export default MapTypeCard;
