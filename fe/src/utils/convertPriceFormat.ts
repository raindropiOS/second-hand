// TODO(hoonding): convertPriceFormat 함수 test 코드 작성 필요.
const convertPriceFormat = (price: number) => {
  if (price === undefined) return '가격 없음';
  return price.toLocaleString() + '원';
};

export default convertPriceFormat;
