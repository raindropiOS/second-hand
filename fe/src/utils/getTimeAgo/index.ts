const index = (timestamp: string): string => {
  // TODO(jayden): test code 추가하기
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const timeDifferenceInMilliseconds = currentDate.getTime() - targetDate.getTime();
  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}분 전`;
  } else if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours}시간 전`;
  } else {
    return `${timeDifferenceInDays}일 전`;
  }
};

export default index;
