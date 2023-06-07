const PALETTE = {
  WHITE: '#FFFFFF',
  GRAY_50: '#FEFEFE',
  GRAY_100: '#F7F7FC',
  GRAY_200: '#EFF0F6',
  GRAY_300: '#D9DBE9',
  GRAY_400: '#BEC1D5',
  GRAY_500: '#A0A3BD',
  GRAY_600: '#6E7191',
  GRAY_700: '#4E4B66',
  GRAY_800: '#2A2A44',
  GRAY_900: '#14142B',
  BLUE: '#007AFF',
  NAVY: '#0025E6',
  RED: '#FF3B30',
};

const lightColors = {
  neutral: {
    text: {
      default: PALETTE.GRAY_700,
      weak: PALETTE.GRAY_600,
      strong: PALETTE.GRAY_900,
    },
    background: {
      default: PALETTE.WHITE,
      bold: PALETTE.GRAY_200,
      strong: PALETTE.GRAY_50,
    },
    border: {
      default: PALETTE.GRAY_300,
      active: PALETTE.GRAY_900,
    },
  },
  accent: {
    text: {
      default: PALETTE.GRAY_50,
      weak: PALETTE.BLUE,
    },
    background: {
      default: PALETTE.BLUE,
      weak: PALETTE.GRAY_50,
      strong: PALETTE.GRAY_900,
    },
    border: {
      weak: PALETTE.BLUE,
    },
  },
  danger: {
    text: PALETTE.RED,
    border: PALETTE.RED,
  },
  icon: {
    text: PALETTE.GRAY_50,
    background: {
      blue: PALETTE.BLUE,
      navy: PALETTE.NAVY,
    },
  },
};

export { lightColors };
