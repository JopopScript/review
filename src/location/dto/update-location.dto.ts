import { PartialType } from "@nestjs/swagger";
import { CreateLocationDto } from "./create-location.dto";

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
// export class UpdateLocationDto {
//   @ApiProperty({ description: '위치정보 명', example: 'A-1-1', maxLength: 50, required: false })
//   @IsOptional()
//   @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
//   @IsString({ message: CustomValidateMessage.isString })
//   @MaxLength(50, { message: CustomValidateMessage.maxLength })
//   name?: string;

//   @ApiProperty({ description: '창고 아이디', example: 123, required: false })
//   @IsOptional()
//   @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
//   @IsInt({ message: CustomValidateMessage.isInt })
//   spaceId?: number;
// };