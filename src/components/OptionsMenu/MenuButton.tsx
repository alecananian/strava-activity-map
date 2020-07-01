import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default styled(Button)`${({ theme }) => `
  background-color: ${theme.palette.background.paper};
  color: ${theme.palette.text.secondary};
  min-width: auto;
  width: 50px;
  height: 50px;
  margin-bottom: ${theme.spacing(0.5)}px;
  &:hover {
    background-color: ${theme.palette.background.default};
  }
`}`;
