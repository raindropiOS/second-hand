import React, { createContext, useContext, useState } from 'react';

import Chip from '@atoms/Chip';
import { $ChipsLayout } from './Chips.style';

type Category = { id: number; category: string };
type Categories = Category[];

interface ChipsProps {
  categories: Categories;
  children?: React.ReactNode;
}

interface ChipsContextType {
  categories: Categories;
  activeItem: number;
  setActiveItem: React.Dispatch<React.SetStateAction<number>>;
}

interface ChipsListProps {
  categories: Categories;
  onClick: (id: number) => void;
}

interface ItemProps {
  id: number;
  category: string;
  onClick: (id: number) => void;
}

const ChipsContext = createContext<ChipsContextType>({
  categories: [],
  activeItem: 0,
  // NOTE(hoonding): eslint no-empty-function 때문에,,,
  setActiveItem: () => undefined,
});

const Chips = ({ categories, children }: ChipsProps) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  return <ChipsContext.Provider value={{ categories, activeItem, setActiveItem }}>{children}</ChipsContext.Provider>;
};

const Item = ({ id, category, onClick }: ItemProps) => {
  const { activeItem, setActiveItem } = useContext(ChipsContext);

  const handleClick = () => {
    setActiveItem(id); // ui state 변경
    onClick(id); // parent에서의 filter state 변경
  };

  return <Chip active={activeItem === id} content={category} onClick={handleClick} />;
};

Chips.Item = Item;

const ChipList = ({ categories, onClick }: ChipsListProps) => {
  const newCategories = [{ id: 0, category: '전체' }, ...categories];

  return (
    <$ChipsLayout>
      <Chips categories={newCategories}>
        {newCategories.map(({ id, category }: Category) => (
          <Chips.Item key={id} id={id} category={category} onClick={onClick} />
        ))}
      </Chips>
    </$ChipsLayout>
  );
};

export default ChipList;
