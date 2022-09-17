import { DatabaseError, DatabaseStatus } from '@/common/error/database.error';
import { CustomSpaceRepository } from '@/space/repository/custom-space.repository';
import { Injectable, Logger } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { CustomLocationRepository } from './repository/custom-location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: CustomLocationRepository,
    private readonly spaceRepository: CustomSpaceRepository,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    Logger.debug(`LocationService |create() call |createLocationDto: `, createLocationDto);
    let space = await this.spaceRepository.findOneBy({ id: createLocationDto.spaceId });
    if (!space) {
      throw new DatabaseError(DatabaseStatus.NO_RESULT, `spaceId: ${createLocationDto.spaceId} |space가 존재하지 않아 location을 생성할 수 없습니다.`);
    }

    const equalNameAndLocationId = await this.locationRepository.findOneBy({ name: createLocationDto.name, spaceId: space.id });
    if (equalNameAndLocationId) {
      throw new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${createLocationDto.name} |spaceId: ${space.id} |name과 spaceId가 같은 location이 이미 존재하여 생성할 수 없습니다.`);
    }
    return await this.locationRepository.save(createLocationDto);
  }

  async findAll(page: number, pageSize: number): Promise<Array<Location>> {
    Logger.debug(`LocationService |findAll() call`);
    return await this.locationRepository.find({
      relations: ['space', 'resource', 'inventories'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOneById(id: number) {
    Logger.debug(`LocationService |findOneById() call |id: ${id}`);
    const location = await this.locationRepository.findOne({
      relations: ['space', 'resource', 'inventories'],
      where: { id },
    });
    if (!location) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 location이 존재하지 않습니다.`);
    }
    return location;
  }

  async update(id: number, updateLocation: Partial<Location>): Promise<Location> {
    Logger.debug(`LocationService |update() call |id: ${id} |updateLocation: `, updateLocation);
    const originalLocation = await this.locationRepository.findOneBy({ id });
    if (!originalLocation) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 location이 존재하지 않습니다.`);
    }
    const changedLocation = { ...originalLocation, ...updateLocation };
    const equalNameAndLocationId = await this.locationRepository.findOneBy({ name: changedLocation.name, spaceId: changedLocation.spaceId });
    if (equalNameAndLocationId) {
      throw new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${changedLocation.name} |spaceId: ${changedLocation.id} |name과 spaceId가 같은 location이 이미 존재하여 수정할 수 없습니다.`);
    }
    return await this.locationRepository.save(changedLocation);
  }

  async remove(id: number): Promise<void> {
    Logger.debug(`LocationService |remove() call |id: ${id}`);
    const location = await this.locationRepository.findOneBy({ id });
    if (!location) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 location이 존재하지 않습니다.`);
    }
    await this.locationRepository.softRemove(location);
  }
}
