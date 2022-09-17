import { Location } from '@/location/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity';

@Entity()
export class Space extends BaseEntity {
  @ApiProperty({ description: '공간명', maxLength: 20, example: '용인1섹터입고', uniqueItems: true })
  @Column({ type: 'varchar', length: 20 })
  @Index({ unique: true })
  name: string;

  @ApiProperty({ description: '입고가능 여부', example: true })
  @Column('boolean')
  inputEnable: boolean;

  @ApiProperty({ description: '출고가능 여부', example: false })
  @Column('boolean')
  outputEnable: boolean;

  @ApiProperty({ description: '보관가능 여부', example: false })
  @Column('boolean')
  storeEnable: boolean;

  @OneToMany(() => Location, (location) => location.space)
  locations: Location[];
}