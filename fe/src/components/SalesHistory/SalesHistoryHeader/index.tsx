import React from 'react';

import Navbar from '@molecules/Navbar';
import SegmentedControl from '@molecules/SegmentedControl';
import { $SegmentedControlContainer } from '@components/SalesHistory/SalesHistoryHeader/SalesHistoryHeader.style';

const SALES_STATUSES = [
  { id: 0, title: '판매중' },
  { id: 2, title: '판매완료' },
];

const SalesHistoryHeader = () => {
  return (
    <>
      <Navbar>
        <span>판매 내역</span>
      </Navbar>
      <$SegmentedControlContainer>
        <SegmentedControl>
          {SALES_STATUSES.map((status, index) => (
            <SegmentedControl.SegmentedButton
              key={status.id}
              segmentedIndex={index}
              onClick={() => {
                console.log(status.id);
              }}
            >
              {status.title}
            </SegmentedControl.SegmentedButton>
          ))}
        </SegmentedControl>
      </$SegmentedControlContainer>
    </>
  );
};

export default SalesHistoryHeader;
