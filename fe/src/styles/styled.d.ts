import 'styled-components';

import { ColorsType, FontTokenType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    COLORS: ColorsType;
    FONT_TOKEN: FontTokenType;
  }
}
