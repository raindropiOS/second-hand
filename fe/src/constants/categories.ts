const CATEGORIES = [
  {
    id: 1,
    category: '디지털기기',
    url: `${process.env.PUBLIC_URL}/assets/digital.png`,
    placeholder:
      '모델명, 구성품, 구매 시기, 사용감 (흠집, 파손 여부, 수리 여부), 전자파 인증번호 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 2,
    category: '생활가전',
    url: `${process.env.PUBLIC_URL}/assets/domestic.png`,
    placeholder:
      '모델명, 구성품, 구매 시기, 사용감 (흠집, 파손 여부, 수리 여부), 전자파 인증번호 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 3,
    category: '가구/인테리어',
    url: `${process.env.PUBLIC_URL}/assets/furniture.png`,
    placeholder:
      '모델명, 구매 시기, 크기 (가로/세로/높이), 사용감 (흠집, 파손 여부) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 4,
    category: '생활/주방',
    url: `${process.env.PUBLIC_URL}/assets/kitchen.png`,
    placeholder:
      '구매 시기, 사용감 (흠집, 파손 여부) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 5,
    category: '유아동',
    url: `${process.env.PUBLIC_URL}/assets/baby.png`,
    placeholder:
      '사이즈, 구매 시기, 사용감 (색바램, 얼룩, 뜯어짐) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 6,
    category: '유아도서',
    url: `${process.env.PUBLIC_URL}/assets/baby-book.png`,
    placeholder:
      '권수 (전집의 경우 누락 여부), 사용감 (찢김, 색바램, 낙서) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 7,
    category: '여성의류',
    url: `${process.env.PUBLIC_URL}/assets/woman-apparel.png`,
    placeholder:
      '구매 시기, 사이즈, 사용감 (색바램, 얼룩, 뜯어짐) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 8,
    category: '여성잡화',
    url: `${process.env.PUBLIC_URL}/assets/woman-accessories.png`,
    placeholder:
      '구매 시기, 사이즈, 사용감 (색바램, 얼룩, 뜯어짐) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 9,
    category: '남성패션/잡화',
    url: `${process.env.PUBLIC_URL}/assets/man-apparel.png`,
    placeholder:
      '구매 시기, 사이즈, 사용감 (색바램, 얼룩, 뜯어짐) 등\n\n신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 10,
    category: '뷰티/미용',
    url: `${process.env.PUBLIC_URL}/assets/beauty.png`,
    placeholder:
      '구매 시기, 제조일자 또는 유통기한, 사용감 (파손 여부) 등\n\n※ 화장품 샘플은 판매할 수 없어요.\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 11,
    category: '스포츠/레저',
    url: `${process.env.PUBLIC_URL}/assets/sports.png`,
    placeholder:
      '모델명, 구매 시기, 사용감 (흠집, 파손 여부) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 12,
    category: '취미/게임/음반',
    url: `${process.env.PUBLIC_URL}/assets/game.png`,
    placeholder:
      '구매 시기, 사용감 (흠집, 파손 여부, 상세 사진) 등\n\n ※ 게임, OTT 서비스 등의 계정 정보는 공유하거나 판매할 수 없어요.\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 13,
    category: '중고차',
    url: `${process.env.PUBLIC_URL}/assets/car.png`,
    placeholder:
      '가격정보, 차 정보(연식, 등록일, 주행거리), 보험 이력 정보 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 14,
    category: '티켓/교환권',
    url: `${process.env.PUBLIC_URL}/assets/ticket.png`,
    placeholder:
      '티켓 정보, 유효기간 등\n\n ※ 사용 안 한 교환권의 바코드가 게시되지 않도록 주의해 주세요. 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 15,
    category: '가공식품',
    url: `${process.env.PUBLIC_URL}/assets/processed-foods.png`,
    placeholder:
      '구매 시기, 유통기한 등\n\n ※ 의약품, 건강기능식품은 관련법에 따라 판매할 수 없어요. 의약품, 건강기능식품 라벨이 제품에 표시되어 있는지 반드시 확인해주세요.\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 16,
    category: '반려동물용품',
    url: `${process.env.PUBLIC_URL}/assets/pet.png`,
    placeholder:
      '구매 시기, 사용감 (흠집, 파손 여부) 등\n\n ※ 생명이 있는 모든 동물, 곤충(무료분양, 열대어 포함)은 판매할 수 없어요.\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 17,
    category: '식물',
    url: `${process.env.PUBLIC_URL}/assets/plant.png`,
    placeholder:
      '품종, 크기, 키우는 방법 등\n\n ※ 생명이 있는 모든 동물, 곤충(무료분양, 열대어 포함)은 판매할 수 없어요.\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
  {
    id: 18,
    category: '기타 중고물품',
    url: `${process.env.PUBLIC_URL}/assets/etc.png`,
    placeholder:
      '구매 시기, 사용감 (흠집, 파손 여부) 등\n\n 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요. 훈딩, 제이든, 에디, 하림, 감자, 코어와 함께 해요. ',
  },
];

export { CATEGORIES };
