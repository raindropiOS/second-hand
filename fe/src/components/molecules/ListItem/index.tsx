import React from 'react';
import { useTheme } from 'styled-components';

import getTimeAgo from '@utils/getTimeAgo';

import Icon from '@atoms/Icon';

import {
  $ListItemLayout,
  $Image,
  $TextInfoLayout,
  $TitleLayout,
  $Title,
  $LocationTimestamp,
  $StatusPriceLayout,
  $Status,
  $Price,
  $ChatLikeLayout,
} from './ListItem.style';

interface ListItemProps {
  imgUrl: string;
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
  imgUrl,
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
    // NOTE(jayden): onClick 이벤트를 Touch 관련 이벤트로 대체해야할지 고민해보자!
    <$ListItemLayout onClick={onItemClick}>
      <$Image src={imgUrl} alt="상품 이미지" />
      <$TextInfoLayout>
        <$TitleLayout>
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
        </$TitleLayout>
        <$LocationTimestamp>
          {town}•{getTimeAgo(timestamp)}
        </$LocationTimestamp>
        <$StatusPriceLayout>
          {status && <$Status>{status}</$Status>}
          <$Price>{price ? `${price}원` : NONE_PRICE}</$Price>
        </$StatusPriceLayout>
        <$ChatLikeLayout>
          {!!chatCount && (
            <>
              <Icon name="message" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{chatCount}</div>
            </>
          )}
          {!!likeCount && (
            <>
              <Icon name="like" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{likeCount}</div>
            </>
          )}
        </$ChatLikeLayout>
      </$TextInfoLayout>
    </$ListItemLayout>
  );
};

export default ListItem;
