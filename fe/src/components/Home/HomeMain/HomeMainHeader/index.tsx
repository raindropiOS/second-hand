import React from 'react';

import Icon from '@atoms/Icon';
import Dropdown from '@molecules/Dropdown';
import Navbar from '@molecules/Navbar';

interface HomeMainHeaderProps {
  towns: { townId: number; name: string }[];
}

const HomeMainHeader = ({ towns }: HomeMainHeaderProps) => {
  return (
    <Navbar>
      <Dropdown towns={towns} />
      <button>
        <Icon name="category" />
      </button>
    </Navbar>
  );
};

export default HomeMainHeader;
