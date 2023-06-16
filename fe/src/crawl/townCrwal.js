const regions = document.querySelectorAll('#region3 option');

const regionList = Array.from(regions).map(region => region.value);

regionList.shift();
let id = 0;

const object = regionList.map(item => {
  if (item === '') return;
  id += 1;
  return {
    townId: id,
    name: `서울 강남구 ${item}`,
  };
});

console.log(
  JSON.stringify({
    success: true,
    status: 200,
    code: 20000,
    data: {
      towns: object,
    },
  })
);
