import React from 'react';

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
  $ChatDiv,
} from './SkeletonListItem.style';

const SkeletonListItem = () => {
  return (
    <$ListItemLayout>
      <$Image />
      <$TextInfoLayout>
        <$TitleLayout>
          <$Title />
        </$TitleLayout>
        <$LocationTimestamp />
        <$StatusPriceLayout>
          <$Status />
          <$Price />
        </$StatusPriceLayout>
        <$ChatLikeLayout>
          <$ChatDiv />
          <$ChatDiv />
        </$ChatLikeLayout>
      </$TextInfoLayout>
    </$ListItemLayout>
  );
};

export default SkeletonListItem;
