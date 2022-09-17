import { PartialType } from "@nestjs/swagger";
import { CreateSpaceDto } from "./create-space.dto";

// PatialType을 사용하게 되면 apiProperty의 required가 true로 그대로 들어가 버림
export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {}
// export class UpdateSpaceDto {
//   @ApiPropertyOptional({ type: String, description: '공간명', example: '용인1섹터입고', maxLength: 20 })
//   @IsString({ message: CustomValidateMessage.isString })
//   @IsNotEmpty({ message: CustomValidateMessage.isNotEmpty })
//   @MaxLength(20, { message: CustomValidateMessage.maxLength })
//   @IsOptional()
//   name?: string;

//   @ApiPropertyOptional({ type: Boolean, description: '입고가능 여부', example: true })
//   @IsBoolean({ message: CustomValidateMessage.isBoolean })
//   @IsOptional()
//   inputEnable?: boolean;

//   @ApiPropertyOptional({ type: Boolean, description: '출고가능 여부', example: false })
//   @IsBoolean({ message: CustomValidateMessage.isBoolean })
//   @IsOptional()
//   outputEnable?: boolean;

//   @ApiPropertyOptional({ type: Boolean, description: '보관가능 여부', example: false })
//   @IsBoolean({ message: CustomValidateMessage.isBoolean })
//   @IsOptional()
//   storeEnable?: boolean;
// };