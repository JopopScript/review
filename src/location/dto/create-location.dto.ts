import { CustomValidateMessage } from "@/common/custom-validate-message";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLocationDto  {
  @ApiProperty({ description: '위치정보 명', example: 'A-1-1', maxLength: 50 })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsString({ message: CustomValidateMessage.isString })
  @MaxLength(50, { message: CustomValidateMessage.maxLength })
  name: string;

  @ApiProperty({ description: '창고 아이디', example: 123 })
  @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
  @IsInt({ message: CustomValidateMessage.isInt })
  spaceId: number;
};