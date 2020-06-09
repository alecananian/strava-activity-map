import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';

interface Props {
  open: boolean;
  loading: boolean;
  onLogIn: () => void;
}

const LoginDialog = ({
  open = false,
  loading = false,
  onLogIn,
}: Props) => {
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
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
              <Button
                color="primary"
                variant="contained"
                onClick={onLogIn}
              >
                Connect with Strava
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
