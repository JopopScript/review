
export class CustomValidateMessage {
  static isNotEmpty(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} should not be empty`;
  }

  static isString(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a string`;
  }

  static isBoolean(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a boolean`;
  }

  static maxLength(customValidationArguments: { value: any, property: string, constraints: number[] }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be shorter than or equal to ${customValidationArguments.constraints[0]} characters`;
  }

  static isNumberString(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a number string`;
  }
  
  static isInt(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be an integer number`;
  }

  static isEnum(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a valid enum value`;
  }

  static isDateString(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a valid ISO 8601 date string`;
  }

  static isDateWithoutTime(customValidationArguments: { value: any, property: string }) {
    return `value:${customValidationArguments.value}|${customValidationArguments.property} must be a date(exclude time) string`;
  }
};