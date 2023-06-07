import { DefaultTheme } from 'styled-components';
import { LIGHT_COLORS } from './colors';
import { FONT_TOKEN } from './fonts';

export type ColorsType = typeof LIGHT_COLORS;
export type FontTokenType = typeof FONT_TOKEN;

const theme: DefaultTheme = {
  COLORS: LIGHT_COLORS,
  FONT_TOKEN,
};

export { theme };
