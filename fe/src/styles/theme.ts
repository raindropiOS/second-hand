import { DefaultTheme } from 'styled-components';
import { lightColors } from './colors';
import { fontSizes, fontWeights } from './fonts';

export type ColorsType = typeof lightColors;
export type FontSizesType = typeof fontSizes;
export type FontWeightsType = typeof fontWeights;

const theme: DefaultTheme = {
  colors: lightColors,
  fontSizes,
  fontWeights,
};

export { theme };
