import 'styled-components';
import type { Theme } from '@material-ui/core/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
