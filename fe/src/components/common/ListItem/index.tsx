import React from 'react';

import {
  $Wrapper,
  $Image,
  $TextInfoWrapper,
  $TitleWrapper,
  $Title,
  $LocationTimestamp,
  $StatusPriceWrapper,
  $Status,
  $Price,
  $ChatLikeWrapper,
} from './ListItem.style';
import Icon from '@common/Icon';
import { useTheme } from 'styled-components';

interface ListItemProps {
  img: string;
  title: string;
  town: string;
  timestamp: string;
  status?: string;
  price?: string;
  chatCount: number;
  likeCount: number;
  isCurrentUserItem: boolean;
  onItemClick: () => void;
  onItemMoreClick?: () => void;
}

const NONE_PRICE = '가격 없음';

const ListItem = ({
  img,
  title,
  town,
  timestamp,
  status,
  price,
  chatCount,
  likeCount,
  isCurrentUserItem,
  onItemClick,
  onItemMoreClick,
}: ListItemProps) => {
  const theme = useTheme();

  return (
    // FIXME(jayden): onClick 이벤트를 Touch 관련 이벤트로 대체해야함
    <$Wrapper onClick={onItemClick}>
      <$Image src={img} alt="상품 이미지" />
      <$TextInfoWrapper>
        <$TitleWrapper>
          <$Title>{title}</$Title>
          {isCurrentUserItem && (
            <div
              onClick={e => {
                e.stopPropagation();
                onItemMoreClick && onItemMoreClick();
              }}
            >
              <Icon name="more" fill={theme.COLORS.NEUTRAL.TEXT.WEAK} />
            </div>
          )}
        </$TitleWrapper>
        <$LocationTimestamp>
          {town}•{timestamp}
        </$LocationTimestamp>
        <$StatusPriceWrapper>
          {status && <$Status>{status}</$Status>}
          <$Price>{price ? `${price}원` : NONE_PRICE}</$Price>
        </$StatusPriceWrapper>
        <$ChatLikeWrapper>
          {!!chatCount && (
            <React.Fragment>
              <Icon name="message" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{chatCount}</div>
            </React.Fragment>
          )}
          {!!likeCount && (
            <React.Fragment>
              <Icon name="like" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{likeCount}</div>
            </React.Fragment>
          )}
        </$ChatLikeWrapper>
      </$TextInfoWrapper>
    </$Wrapper>
  );
};

export default ListItem;
