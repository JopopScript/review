import { CreateSpaceDto } from '@/space/dto/create-space.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseError, DatabaseStatus } from '../common/error/database.error';
import { Space } from './entities/space.entity';
import { CustomSpaceRepository } from './repository/custom-space.repository';

@Injectable()
export class SpaceService {
  constructor(
    @Inject(CustomSpaceRepository)
    private readonly spaceRepository: CustomSpaceRepository,
  ) {}

  async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
    Logger.debug(`SpaceService |create() call |createSpaceDto: `, createSpaceDto);
    const equalNameSpace = await this.spaceRepository.findBy({ name: createSpaceDto.name });
    if (equalNameSpace.length > 0) {
        throw new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${createSpaceDto.name} | name이 같은 space가 이미 존재하여 생성할 수 없습니다.`);
    }
    return await this.spaceRepository.save(createSpaceDto);
  }

  async findAll(page: number, pageSize: number): Promise<Array<Space>> {
    Logger.debug(`SpaceService |findAll() call`);
    return await this.spaceRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOneById(id: number): Promise<Space> {
    Logger.debug(`SpaceService |findOne() call |id: ${id}`);
    const space = await this.spaceRepository.findOneBy({ id });
    if (!space) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 space가 존재하지 않습니다.`);
    }
    return space;
  }

  async update(id: number, updateSpace: Partial<Space>): Promise<Space> {
    Logger.debug(`SpaceService |update() call |id: ${id} |updateSpace: `, updateSpace);
    const originalSpace = await this.spaceRepository.findOneBy({ id });
    if (!originalSpace) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 space가 존재하지 않습니다.`);
    }
    if (updateSpace?.name && updateSpace?.name !== originalSpace.name) {
      const equalNameSpace = await this.spaceRepository.findOneBy({ name: updateSpace.name });
      if (equalNameSpace) {
        throw new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${updateSpace.name} | name이 같은 space가 이미 존재하여 수정할 수 없습니다.`);
      }
    }
    return await this.spaceRepository.save({ ...originalSpace, ...updateSpace });
  }

  async remove(id: number): Promise<void> {
    Logger.debug(`SpaceService |remove() call |id: ${id}`);
    const space = await this.spaceRepository.findOneBy({ id });
    if (!space) {
        throw new DatabaseError(DatabaseStatus.NO_RESULT, `id: ${id} |해당 id의 space가 존재하지 않습니다.`);
    }
    await this.spaceRepository.softRemove(space);
  }
}
