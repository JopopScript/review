import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { CustomValidateMessage } from "../custom-validate-message";

export class PagenationQueryDto  {
  @ApiProperty({ description: '조회할 페이지', example: 1, required: false, default: 1 })
  @IsOptional()
  @IsInt({ message: CustomValidateMessage.isInt })
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @ApiProperty({ description: '한페이지에 보여질 수', example: 10, required: false, default: 10 })
  @IsOptional()
  @IsInt({ message: CustomValidateMessage.isInt })
  @Transform(({ value }) => parseInt(value))
  pageSize: number = 10;
};