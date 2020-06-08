import React from 'react';
import {
  Button,
  ButtonGroup,
} from '@material-ui/core';

type Props = {
  options?: [string, string][],
  value?: string,
  onChange: (value: string) => void,
};

const ButtonSelect = ({
  options = [],
  value,
  onChange,
}: Props) => (
  <ButtonGroup
    color="primary"
    size="small"
    fullWidth
    disableElevation
  >
    {options.map(([optionKey, optionValue]) => (
      <Button
        key={optionKey}
        variant={optionKey === value ? 'contained' : 'outlined'}
        onClick={() => onChange(optionKey)}
      >
        {optionValue}
      </Button>
    ))}
  </ButtonGroup>
);

export default ButtonSelect;
