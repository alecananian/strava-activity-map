import styled from 'styled-components';

const ColorDisplay = styled.div`${({
  theme,
  color,
  onClick,
}) => `
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: 1px solid ${theme.palette.divider};
  border-radius: 50%;
  background-color: ${color};
  cursor: ${onClick ? 'pointer' : 'auto'};
`}`;

export default ColorDisplay;
