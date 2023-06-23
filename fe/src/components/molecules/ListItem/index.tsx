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
import getStatusWord from '@utils/getStatusWord';

type Town = {
  townId: number;
  name: string;
};

type CountInfo = {
  chatCount: number;
  likeCount: number;
};

interface ListItemProps {
  productId: number;
  title: string;
  town: Town;
  createdAt: string;
  status: number;
  price?: string;
  countInfo: CountInfo;
  imgUrl: string;
  isCurrentUserItem: boolean;
  onItemClick: () => void;
  onItemMoreClick?: () => void;
}

const ListItem = ({
  productId,
  title,
  town,
  createdAt,
  status,
  price,
  countInfo,
  imgUrl,
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
          {town.name}•{getTimeAgo(createdAt)}
        </$LocationTimestamp>
        <$StatusPriceLayout>
          <$Status>{getStatusWord(status)}</$Status>
          <$Price>{price}</$Price>
        </$StatusPriceLayout>
        <$ChatLikeLayout>
          {!!countInfo.chatCount && (
            <>
              <Icon name="message" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{countInfo.chatCount}</div>
            </>
          )}
          {!!countInfo.likeCount && (
            <>
              <Icon name="like" fill={theme.COLORS.NEUTRAL.TEXT.DEFAULT} />
              <div>{countInfo.likeCount}</div>
            </>
          )}
        </$ChatLikeLayout>
      </$TextInfoLayout>
    </$ListItemLayout>
  );
};

export default ListItem;
