import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { CustomSpaceRepository } from './repository/custom-space.repository';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  //https://docs.nestjs.com/techniques/database#repository-pattern
  imports: [TypeOrmModule.forFeature([Space])],
  controllers: [SpaceController],
  providers: [CustomSpaceRepository, SpaceService],
  exports: [CustomSpaceRepository, SpaceService],
})
export class SpaceModule {}
