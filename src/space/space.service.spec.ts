import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MockRepository } from '../../test/mock/typeorm-repository.mock';
import { DatabaseError, DatabaseStatus } from '../common/error/database.error';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Space } from './entities/space.entity';
import { CustomSpaceRepository } from './repository/custom-space.repository';
import { SpaceService } from './space.service';

describe('SpaceService', () => {
  let service: SpaceService;
  let repository: Repository<Space>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpaceService,
        {
          provide: getRepositoryToken(CustomSpaceRepository),
          useValue: new MockRepository<Space>(),
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource
        },
      ],
    }).compile();
    service = module.get(SpaceService);
    repository = module.get(getRepositoryToken(CustomSpaceRepository));
  });

  describe('create', () => {
    it('정상처리: 전달된 데이터와 실제 데이터베이스입력된 데이터가 동일해야함', async () => {
      //given
      const createSpaceDto: CreateSpaceDto = {
        name: "용인-1섹터-보관2",
        inputEnable: false,
        outputEnable: false,
        storeEnable: true
      };
      //when
      const createdSpace = await service.create(createSpaceDto);

      //then  
      const selectedSpace = await repository.findOneBy({ id: createdSpace.id });
      expect(selectedSpace).toBeDefined();
      expect(selectedSpace?.name).toBe(createSpaceDto.name);
      expect(selectedSpace?.inputEnable).toBe(createSpaceDto.inputEnable);
      expect(selectedSpace?.outputEnable).toBe(createSpaceDto.outputEnable);
      expect(selectedSpace?.storeEnable).toBe(createSpaceDto.storeEnable);

      // repository.save = jest.fn();
      // expect(repository.save).toBeCalledTimes(1);
      // expect(repository.save).toBeCalledWith(expect.objectContaining(createSpaceDto));
    });

    it('에러발생: 동일한 name이 이미 존재하는 경우', async () => {
      //given
      const name = '용인-1섹터-보관2';
      repository.save({
        name: name,
        inputEnable: false,
        outputEnable: false,
        storeEnable: true
      });
      const createSpaceDto: CreateSpaceDto = {
        name: name,
        inputEnable: true,
        outputEnable: true,
        storeEnable: true
      };

      //when
      //then
      try {
        const createdSpace = await service.create(createSpaceDto);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NOT_ALLOW_DUPLICATE);
        expect(e?.describe).toBe(`name: ${name} | name이 같은 space가 이미 존재하여 생성할 수 없습니다.`);
      }
    });
  });

  describe('findAll', () => {
    let initiaSpaceData: Space[];
    beforeEach(async () => {
      initiaSpaceData = [
        {
            'id': 1,
            'createdAt': new Date('2022-08-28T16:54:54.642Z'),
            'updatedAt': new Date('2022-08-28T16:54:54.642Z'),
            'deletedAt': null,
            'name': '1섹터-입고대기',
            'inputEnable': true,
            'outputEnable': false,
            'storeEnable': false
        },
        {
            'id': 2,
            'createdAt': new Date('2022-08-28T16:55:01.502Z'),
            'updatedAt': new Date('2022-08-28T16:55:01.502Z'),
            'deletedAt': null,
            'name': '1섹터-입고',
            'inputEnable': true,
            'outputEnable': false,
            'storeEnable': false
        },
        {
            'id': 3,
            'createdAt': new Date('2022-08-28T16:55:23.319Z'),
            'updatedAt': new Date('2022-08-28T16:55:23.319Z'),
            'deletedAt': null,
            'name': '1섹터-출고',
            'inputEnable': false,
            'outputEnable': true,
            'storeEnable': false
        },
        {
            'id': 4,
            'createdAt': new Date('2022-08-28T16:55:34.409Z'),
            'updatedAt': new Date('2022-08-28T16:57:10.960Z'),
            'deletedAt': null,
            'name': '1섹터-보관2',
            'inputEnable': false,
            'outputEnable': false,
            'storeEnable': true
        },
        {
            'id': 5,
            'createdAt': new Date('2022-08-30T20:59:47.923Z'),
            'updatedAt': new Date('2022-08-30T20:59:47.923Z'),
            'deletedAt': null,
            'name': '1섹터-보관4',
            'inputEnable': false,
            'outputEnable': false,
            'storeEnable': true
        },
        {
            'id': 8,
            'createdAt': new Date('2022-09-01T08:09:37.685Z'),
            'updatedAt': new Date('2022-09-01T08:09:37.685Z'),
            'deletedAt': null,
            'name': '2섹터-입고대기',
            'inputEnable': true,
            'outputEnable': false,
            'storeEnable': false
        },
        {
            'id': 9,
            'createdAt': new Date('2022-09-01T08:09:37.685Z'),
            'updatedAt': new Date('2022-09-01T08:09:37.685Z'),
            'deletedAt': null,
            'name': '2섹터-입고',
            'inputEnable': true,
            'outputEnable': false,
            'storeEnable': false
        },
        {
            'id': 10,
            'createdAt': new Date('2022-09-01T08:09:37.685Z'),
            'updatedAt': new Date('2022-09-01T08:09:37.685Z'),
            'deletedAt': null,
            'name': '2섹터-출고',
            'inputEnable': false,
            'outputEnable': true,
            'storeEnable': false
        },
        {
            'id': 11,
            'createdAt': new Date('2022-09-01T08:09:37.685Z'),
            'updatedAt': new Date('2022-09-01T08:09:37.685Z'),
            'deletedAt': null,
            'name': '2섹터-보관',
            'inputEnable': false,
            'outputEnable': false,
            'storeEnable': true
        },
        {
            'id': 12,
            'createdAt': new Date('2022-09-01T08:09:37.685Z'),
            'updatedAt': new Date('2022-09-01T08:09:37.685Z'),
            'deletedAt': null,
            'name': '3섹터-입고대기',
            'inputEnable': true,
            'outputEnable': false,
            'storeEnable': false
        }
    ] as Space[];
    })

    it('정상처리: 지정페이지 조회되어야 함', async () => {
      //given
      const page = 2
      const pageSize = 2
      const startPoint = (Number(page) - 1) * Number(pageSize);
      const selectCount = Number(pageSize);
      const expectedSpace = initiaSpaceData.slice(startPoint, startPoint + selectCount);
      repository.find = jest.fn().mockResolvedValue(expectedSpace);

      // when
      const foundSpaces = await service.findAll(page, pageSize);

      //then
      expect(foundSpaces?.length).toBe(expectedSpace?.length);
      for (let i = 0; i < foundSpaces.length; i++) {
        expect(foundSpaces[i]?.id).toEqual(expectedSpace[i]?.id);
        expect(foundSpaces[i]?.name).toBe(expectedSpace[i]?.name);
        expect(foundSpaces[i]?.inputEnable).toBe(expectedSpace[i]?.inputEnable);
        expect(foundSpaces[i]?.outputEnable).toEqual(expectedSpace[i]?.outputEnable);
        expect(foundSpaces[i]?.storeEnable).toEqual(expectedSpace[i]?.storeEnable);
        expect(foundSpaces[i]?.createdAt).toBe(expectedSpace[i]?.createdAt);
        expect(foundSpaces[i]?.updatedAt).toEqual(expectedSpace[i]?.updatedAt);
        expect(foundSpaces[i]?.deletedAt).toEqual(expectedSpace[i]?.deletedAt);
      }
    });

    it('정상처리: 데이터베이스가 비어있는경우 결과가 없어야함', async () => {
      //given
      //when
      const foundAllSpaces = await service.findAll(1, 100);

      //then
      expect(foundAllSpaces?.length).toBe(0);
    });
  });

  describe('findOneById', () => {
    it('정상처리: 해당 id 데이터 반환해야함', async () => {
      //given
      const createSpaceDto: CreateSpaceDto = {
        name: "용인-1섹터-보관2",
        inputEnable: false,
        outputEnable: false,
        storeEnable: true
      };
      const createdSpace = await repository.save(createSpaceDto);

      //when
      const selectedSpace = await service.findOneById(createdSpace.id);

      //then
      expect(selectedSpace).toEqual(createdSpace);
    });

    it('애러발생: id의 데이터가 없는 경우', async () => {
      //given
      repository.findOne = jest.fn().mockResolvedValue(null);
      const id = 1;
      //when
      //then
      try {
        const foundSpace = await service.findOneById(id);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe(`id: ${id} |해당 id의 space가 존재하지 않습니다.`);
      }
    });
  });


  describe('update', () => {
    it('정상처리: 실제 데이터베이스 변경되어야 함', async () => {
      //given
      const dummySpace = {
        name: "용인-1섹터-입고",
        inputEnable: true,
        outputEnable: false,
        storeEnable: false
      }
      let insertedSpace: Space = await repository.save(dummySpace);
      const updateId = insertedSpace.id;
      const updateSpace = {
        outputEnable: true,
        storeEnable: true,
      }
      const expectedSpace = { ...insertedSpace, ...updateSpace };

      //when
      const updatedSpace = await service.update(updateId, updateSpace);

      //then
      expect(updatedSpace.id).toBe(expectedSpace.id);
      expect(updatedSpace.name).toBe(expectedSpace.name);
      expect(updatedSpace.inputEnable).toBe(expectedSpace.inputEnable);
      expect(updatedSpace.outputEnable).toBe(expectedSpace.outputEnable);
      expect(updatedSpace.storeEnable).toBe(expectedSpace.storeEnable);
      expect(updatedSpace.createdAt).toEqual(expectedSpace.createdAt);
    });

    it('에러발생: id의 데이터가 없는 경우', async () => {
      //given
      const updateId = 1;
      const updateSpace = {
        outputEnable: false,
        storeEnable: false
      }
      
      //when
      //then
      try {
        const updatedSpace = await service.update(updateId, updateSpace);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe(`id: ${updateId} |해당 id의 space가 존재하지 않습니다.`);
      }
    });

    it('에러발생: 동일한 name이 이미 존재하는 경우', async () => {
      //given
      const dummySpace1 = {
        name: "용인-1섹터-입고",
        inputEnable: true,
        outputEnable: false,
        storeEnable: false
      }
      const dummySpace2 = {
        name: "용인-1섹터-출고",
        inputEnable: false,
        outputEnable: true,
        storeEnable: false
      }
      await repository.save(dummySpace1);
      let insertedSpace: Space = await repository.save(dummySpace2);
      const updateId = insertedSpace.id;
      const expectedSpace = { name: dummySpace1.name };

      //when
      const updatedSpace = service.update(updateId, expectedSpace);
      
      //then
      const expecteError = new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${expectedSpace.name} | name이 같은 space가 이미 존재하여 수정할 수 없습니다.`);
      expect(updatedSpace).rejects.toEqual(expecteError);
    });
  });

  describe('remove', () => {
    it('정상처리: 실제 데이터베이스에서 삭제되어야 함', async () => {
      //given
      const dummySpace = {
        name: "용인-1섹터-입고",
        inputEnable: true,
        outputEnable: false,
        storeEnable: false
      }
      let insertedSpace: Space = await repository.save(dummySpace);

      //when
      const removedSpace = await service.remove(insertedSpace.id);

      //then
      const foundSpace = await repository.findOneBy({ id: insertedSpace.id });
      expect(foundSpace).toBe(null);
    });
    
    it('에러처리: id의 데이터가 없는 경우', async () => {
      //given
      const removeId = 1;
      
      //when
      //then
      try {
        const removedSpace = await service.remove(removeId);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe(`id: ${removeId} |해당 id의 space가 존재하지 않습니다.`);
      }
    });
  });
});

