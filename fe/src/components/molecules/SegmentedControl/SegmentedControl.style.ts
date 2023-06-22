import styled from 'styled-components';

const $SegmentedControl = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  position: relative;
  padding: 2px;
  width: fit-content;
  height: 32px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
  border-radius: 8px;
  z-index: 1;
`;

interface ISegmentedSelectedProps {
  selectedIndex?: number;
}

const $SegmentedSelected = styled.div<ISegmentedSelectedProps>`
  position: absolute;

  width: 120px;
  height: 28px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};

  left: 2px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 7px;

  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12), 0 3px 1px rgba(0, 0, 0, 0.04);
  z-index: 2;

  transform: translateX(
    ${({ selectedIndex }) => {
      !selectedIndex && (selectedIndex = 0);
      return selectedIndex * 120;
    }}px
  );
  transition: transform 0.5s ease-in-out;
`;

export { $SegmentedControl, $SegmentedSelected };
