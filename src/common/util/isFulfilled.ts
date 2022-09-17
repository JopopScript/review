/**
 * PromiseSettled중에서 성공값인지 확인
 * 사용 예시: allSettled의 결과중 성공값만 필터링 후 결과객체만 반환
 * const promiseSettledResult = await Promise.allSettled(....);
 * promiseSettledResult.filter(asserFulfilled).map(result => result.value);
 */
export function isFulfilled<T>(item: PromiseSettledResult<T>): item is PromiseFulfilledResult<T> {
      return item.status === 'fulfilled';
  }