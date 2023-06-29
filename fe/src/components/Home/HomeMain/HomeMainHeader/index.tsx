import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@atoms/Icon';
import Dropdown from '@molecules/Dropdown';
import Navbar from '@molecules/Navbar';
import PATH from '@constants/routerPath';

interface HomeMainHeaderProps {
  towns: { id: number; name: string }[];
  currentCategoryId: number;
  handleFilterTownId: (townId: number) => void;
}

const HomeMainHeader = ({ towns, currentCategoryId, handleFilterTownId }: HomeMainHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Dropdown towns={towns} handleFilterTownId={handleFilterTownId} />
      <button
        onClick={() => {
          navigate(PATH.HOME.CATEGORY, { state: { currentCategoryId } });
        }}
      >
        <Icon name="category" />
      </button>
    </Navbar>
  );
};

export default HomeMainHeader;
