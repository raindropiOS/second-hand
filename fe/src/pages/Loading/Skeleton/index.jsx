import React from 'react';

import SkeletonListItem from '@components/Loading/Skeleton/SkeletonListItem';
import SkeletonHeader from '@components/Loading/Skeleton/SkeletonHeader';

const Skeleton = () => {
  return (
    <>
      <SkeletonHeader />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
    </>
  );
};

export default Skeleton;
