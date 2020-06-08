import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';

interface Props {
  open: boolean;
  onLogIn: () => void;
}

const LoginButton = styled.button`
  width: 193px;
  height: 48px;
  background: url(/images/btn_strava_connectwith_orange@2x.png) no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
`;

const LoginDialog = ({ open = true, onLogIn }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="login-dialog-title"
      aria-describedby="login-dialog-description"
    >
      <DialogContent>
        <Typography variant="h4" align="center">
          {t('app.title')}
        </Typography>
        <Typography
          id="login-dialog-description"
          component="div"
          align="center"
        >
          {t('app.description')}
        </Typography>
        <Box my={2} textAlign="center">
          <LoginButton onClick={onLogIn} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
