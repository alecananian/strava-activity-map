import React from 'react';

import { ActivityMap } from '~/components/ActivityMap';
import { LoginDialog } from '~/components/LoginDialog';
import { OptionsMenu } from '~/components/OptionsMenu';

import { useStrava } from '~/contexts/strava';

const MapView = () => {
  const {
    isAuthenticated,
    isAuthenticating,
    logIn,
  } = useStrava();
  return (
    <>
      <LoginDialog
        open={!isAuthenticated}
        loading={isAuthenticating}
        onLogIn={logIn}
      />
      <OptionsMenu />
      <ActivityMap />
    </>
  );
};

export default MapView;
