import 'styled-components';
import type { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
