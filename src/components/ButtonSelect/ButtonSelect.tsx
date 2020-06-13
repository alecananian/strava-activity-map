import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
