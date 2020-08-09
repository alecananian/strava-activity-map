import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import type { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

import { DistanceUnit } from '~/types';
import { getAvailableLanguages } from '~/utils/i18n';

type Props = DialogProps & {
  language: string,
  units: DistanceUnit,
  onSave: (language: string, units: DistanceUnit) => void,
  onCancel: () => void,
};

const LocalizationSettingsDialog = ({
  language: languageProp,
  units: unitsProp,
  onSave,
  onCancel,
  ...props
}: Props) => {
  const [languageValue, setLanguageValue] = useState(languageProp);
  const [unitsValue, setUnitsValue] = useState(unitsProp);

  const { t } = useTranslation();
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="i18n-settings-dialog-title"
      {...props}
    >
      <DialogTitle id="i18n-settings-dialog-title">{t('menu.localizationSettings')}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{t('language')}</Typography>
            <RadioGroup
              aria-label="language"
              name="language"
              value={languageValue}
              onChange={(_, value) => setLanguageValue(value)}
            >
              {getAvailableLanguages().map((language) => (
                <FormControlLabel
                  key={language}
                  value={language}
                  control={<Radio />}
                  label={t('languageName', { context: language })}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{t('units')}</Typography>
            <RadioGroup
              aria-label="units"
              name="units"
              value={unitsValue}
              onChange={(_, value) => setUnitsValue(value as DistanceUnit)}
            >
              {Object.values(DistanceUnit).map((unit) => (
                <FormControlLabel
                  key={unit}
                  value={unit}
                  control={<Radio />}
                  label={t('distanceUnit', { context: unit })}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} color="primary">
          {t('cancel')}
        </Button>
        <Button onClick={() => onSave(languageValue, unitsValue)} color="primary">
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocalizationSettingsDialog;
