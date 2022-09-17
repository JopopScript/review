import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity';
import { Space } from '../../space/entities/space.entity';

@Index('IX_location_name_space_id', ['name', 'spaceId'])
@Entity()
export class Location extends BaseEntity {
  @ApiProperty({ description: '위치명', example: 'A01-11-11', maxLength: 50 })
  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @ApiProperty({ description: '소속된 공간 id', example: 1 })
  @Column({ type: 'integer', name: 'space_id' })
  spaceId: number;

  @ApiProperty({ type: () => Space })
  @ManyToOne(() => Space, (Space) => Space.locations, { cascade: ['update'] })
  @JoinColumn([{ name: 'space_id', referencedColumnName: 'id' }])
  space: Space;
}