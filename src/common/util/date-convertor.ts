/**
 * 문자열 형태의 일시를 Date객체로 변환
 * @option date: 연, 월, 일 값으로만 생성후 시간 미사용 / 한국 기준 날짜로 관리됨
 *         timestamp: 연월일시간 모두 사용 / UTC기준으로 DB에 저장 관리되며 필요시에 한국시간으로 변환됨
 */
export function dateStringToDate(dateISOString: string, option?: 'date' | 'timestamp'): Date {
  const date = new Date(dateISOString);
  switch (option) {
    case undefined:
      return date;
    case 'date':
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
    case 'timestamp':
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()));
    default:
      throw new Error(`convertTime should be [undefined | 'date' | 'timestamp']`);
  }
}