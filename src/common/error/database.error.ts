/**
 * 데이터베이스에서 작업중 원하는 결과가 나오지 않는 경우 사용
 */
export class DatabaseError extends Error {
  code: DatabaseStatus;
  describe?: string;
  constructor(code: DatabaseStatus, describe?: string, error?: Error) {
      super();
      this.name = error?.name ?? '';
      this.message = error?.message ?? '';
      this.stack = error?.message;
      Object.setPrototypeOf(this, DatabaseError.prototype);
      this.code = code ? code : DatabaseStatus.UNKNOWN;
      this.describe = describe ? describe : '';
  }
}

export enum DatabaseStatus {
	NO_RESULT = 'DB01',
	NOT_ALLOW_DUPLICATE = 'DB02',
	DATA_LENGTH_ERROR = 'DB03',
	UNKNOWN = 'DB99'
}

export function getDatabaseStatusMessage(status: DatabaseStatus): string {
  return {
    [DatabaseStatus.NO_RESULT]: '데이터베이스 조회 결과 없음',
    [DatabaseStatus.NOT_ALLOW_DUPLICATE]: '중복 insert 허용 안함',
    [DatabaseStatus.DATA_LENGTH_ERROR]: '조회된 데이터가 예상한개수와 다름',
    [DatabaseStatus.UNKNOWN]: '알수없는 에러'
  }[status];
}