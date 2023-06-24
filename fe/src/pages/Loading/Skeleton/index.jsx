import React from 'react';

import { $Template } from '@styles/PageTemplate.style';

import SkeletonListItem from '@components/Loading/Skeleton/SkeletonListItem';
import SkeletonHeader from '@components/Loading/Skeleton/SkeletonHeader';
import { $MainLayout } from './Skeleton.style';

const Skeleton = () => {
  return (
    <>
      <SkeletonHeader />
      <$MainLayout>
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </$MainLayout>
    </>
  );
};

export default Skeleton;
