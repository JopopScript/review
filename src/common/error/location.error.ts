export class LocationError extends Error {
  code: LocationStatus;
  describe?: string;
  constructor(code: LocationStatus, describe?: string, error?: Error) {
      super();
      this.name = error?.name ?? '';
      this.message = error?.message ?? '';
      this.stack = error?.message;
      Object.setPrototypeOf(this, LocationError.prototype);
      this.code = code ? code : LocationStatus.UNKNOWN;
      this.describe = describe ? describe : '';
  }
}

export enum LocationStatus {
	DUPLICATE_RESOURCE = 'LO01',
	UNKNOWN = 'LO99'
}

export function getDatabaseStatusMessage(status: LocationStatus): string {
  return {
    [LocationStatus.DUPLICATE_RESOURCE]: '한 위치(Location)에 2종류 이상의 상품이 있을수 없음',
    [LocationStatus.UNKNOWN]: '알수없는 에러'
  }[status];
}