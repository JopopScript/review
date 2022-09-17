import { SpaceModule } from '@/space/space.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { CustomLocationRepository } from './repository/custom-location.repository';

@Module({
  imports: [
    SpaceModule,
    TypeOrmModule.forFeature([Location])
  ],
  controllers: [LocationController],
  providers: [CustomLocationRepository, LocationService],
  exports: [CustomLocationRepository, LocationService],
})
export class LocationModule {}
