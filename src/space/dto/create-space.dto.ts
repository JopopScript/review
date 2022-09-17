import { CustomValidateMessage } from "@/common/custom-validate-message";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSpaceDto {
  @ApiProperty({ type: String, description: '공간명', example: '용인1섹터입고', maxLength: 20 })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsString({ message: CustomValidateMessage.isString })
  @MaxLength(20, { message: CustomValidateMessage.maxLength })
  name: string;

  @ApiProperty({ type: Boolean, description: '입고가능 여부', example: true })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsBoolean({ message: CustomValidateMessage.isBoolean })
  inputEnable: boolean;

  @ApiProperty({ type: Boolean, description: '출고가능 여부', example: false })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsBoolean({ message: CustomValidateMessage.isBoolean })
  outputEnable: boolean;

  @ApiProperty({ type: Boolean, description: '보관가능 여부', example: false })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsBoolean({ message: CustomValidateMessage.isBoolean })
  storeEnable: boolean;
};