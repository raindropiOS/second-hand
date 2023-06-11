import getTimeAgo from './index';

describe('getTimeAgo', () => {
  it('should return minutes ago for timestamp less than 1 hour ago', () => {
    const currentTimestamp = new Date().getTime();
    const oneMinuteAgo = new Date(currentTimestamp - 60000).toISOString();

    expect(getTimeAgo(oneMinuteAgo)).toBe('1분 전');
  });

  it('should return hours ago for timestamp less than 24 hours ago', () => {
    const currentTimestamp = new Date().getTime();
    const oneHourAgo = new Date(currentTimestamp - 3600000).toISOString();

    expect(getTimeAgo(oneHourAgo)).toBe('1시간 전');
  });

  it('should return days ago for timestamp more than 24 hours ago', () => {
    const currentTimestamp = new Date().getTime();
    const oneDayAgo = new Date(currentTimestamp - 86400000).toISOString();

    expect(getTimeAgo(oneDayAgo)).toBe('1일 전');
  });
});
