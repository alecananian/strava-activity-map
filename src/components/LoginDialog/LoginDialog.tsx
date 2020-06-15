import React from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

interface Props {
  open: boolean;
  loading: boolean;
  onLogIn: () => void;
}

const LoginButton = styled(Button)`
  text-transform: none;
`;

const StravaLogo = styled.span`
  width: 77px;
  height: 15px;
  background: url(${process.env.PUBLIC_URL}/images/logo_strava@2x.png) no-repeat;
  background-size: 100%;
  margin-left: 5px;
`;

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
              <LoginButton
                color="primary"
                variant="contained"
                onClick={onLogIn}
              >
                <Trans i18nKey="login.action">
                  Connect with
                  <StravaLogo />
                </Trans>
              </LoginButton>
            </Box>
            <Typography
              component="div"
              variant="caption"
              align="center"
            >
              {t('app.disclaimer')}
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
