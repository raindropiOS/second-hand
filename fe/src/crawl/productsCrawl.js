const imgs = Array.from(document.querySelectorAll('.card-photo img'));
const prices = Array.from(document.querySelectorAll('.card-price'));
const likeCounts = Array.from(document.querySelectorAll('.card-counts span:nth-child(1)'));
const chatCounts = Array.from(document.querySelectorAll('.card-counts span:nth-child(2)'));

let id = 0;
const regex = /[^0-9]/g;

const products = imgs.map((img, index) => {
  id += 1;
  return {
    productId: id,
    title: img.alt,
    town: {
      townId: 1,
      name: '서울 강남구 역삼1동',
    },
    createdAt: new Date().toISOString(),
    status: '판매중',
    price: +prices[index].innerText.trim().replace(regex, ''),
    countInfo: {
      chatCount: +chatCounts[index].innerText.trim().replace(regex, ''),
      likeCount: +likeCounts[index].innerText.trim().replace(regex, ''),
    },
    imgUrl: img.src,
  };
});

console.log(
  JSON.stringify({
    success: true,
    status: 200,
    code: 20000,
    data: {
      products: products,
    },
  })
);
