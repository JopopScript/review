import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @ApiProperty({ description: '기본키', example: 1, uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '생성일시', example: '2022-09-01T16:31:51.402Z' })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일시',
  })
  createdAt: Date

  @ApiProperty({ description: '수정일시', example: '2022-09-01T16:31:51.402Z' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '수정일시',
  })
  updatedAt: Date

  // https://stackoverflow.com/questions/26525068/does-laravels-soft-delete-need-index-on-mysql
  @DeleteDateColumn({
    type: 'timestamp',
    comment: '삭제일시',
    nullable: true,
  })
  @Index()
  deletedAt: Date | null
}
