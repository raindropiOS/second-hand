import styled from 'styled-components';
import Button from '@atoms/Buttons/Button';

const $FooterContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const $FooterName = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0px 8px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};

  margin-bottom: 15px;
`;

const $TownSettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 8px;
  margin: 15px 0;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
`;

const $ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0px 8px;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
  width: 100%;
`;

const $Button = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  height: 45px;
`;

export { $FooterContainer, $ButtonContainer, $Button, $FooterName, $TownSettingInfo };
