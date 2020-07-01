import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Translate';

import MenuButton from './MenuButton';
import { getAvailableLanguages, changeLanguage } from '~/utils/i18n';

const LanguageMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>();
  const { t } = useTranslation();

  const handleChange = useCallback((language) => {
    changeLanguage(language);
    setAnchorEl(undefined);
  }, []);

  return (
    <>
      <MenuButton
        variant="contained"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <LanguageIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        keepMounted
      >
        {getAvailableLanguages().map((language) => (
          <MenuItem key={language} onClick={() => handleChange(language)}>
            {t('language', { context: language })}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenuButton;
