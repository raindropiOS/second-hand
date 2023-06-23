const index = (status: number) => {
  switch (status) {
    case 0:
      return '판매중';

    case 1:
      return '예약중';

    case 2:
      return '판매완료';

    default:
      return '판매중';
  }
};

export default index;
