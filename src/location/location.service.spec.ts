import { DatabaseError, DatabaseStatus } from '@/common/error/database.error';
import { Space } from '@/space/entities/space.entity';
import { CustomSpaceRepository } from '@/space/repository/custom-space.repository';
import { SpaceService } from '@/space/space.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MockRepository } from '../../test/mock/typeorm-repository.mock';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';
import { CustomLocationRepository } from './repository/custom-location.repository';

describe('LocationService', () => {
  let service: LocationService;
  let locationRepository: Repository<Location>;
  let spaceRepository: Repository<Space>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: class SpaceModule {},
          providers: [
            SpaceService,
            {
              provide: getDataSourceToken(),
              useValue: DataSource
            },
            { 
              provide: getRepositoryToken(CustomSpaceRepository),
              useValue: new MockRepository<Space>(),
            }
          ],
          exports: [CustomSpaceRepository, SpaceService],
        },
      ],
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(CustomLocationRepository),
          useValue: new MockRepository<Location>(),
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource
        },
      ],
    }).compile();
    service = module.get(LocationService);
    locationRepository = module.get(getRepositoryToken(CustomLocationRepository));
    spaceRepository = module.get(getRepositoryToken(CustomSpaceRepository));

    const initSpaceData: [string, boolean, boolean, boolean][] = [
      ['1섹터-입고대기',true,false,false],
      ['1섹터-입고',true,false,false],
      ['1섹터-출고',false,true,false],
      ['1섹터-보관',false,false,true],
      ['2섹터-입고대기',true,false,false],
      ['2섹터-입고',true,false,false],
      ['2섹터-출고',false,true,false],
      ['2섹터-보관',false,false,true],
      ['3섹터-입고대기',true,false,false],
      ['3섹터-입고',true,false,false],
      ['3섹터-출고',false,true,false],
      ['3섹터-보관',false,false,true],
    ];
    for (let i = 0; i < initSpaceData.length; i++) {
      const initSpace = {
        name: initSpaceData[i][0],
        inputEnable: initSpaceData[i][1],
        outputEnable: initSpaceData[i][2],
        storeEnable: initSpaceData[i][3],
      }
      await spaceRepository.save(initSpace);
    }
  });

  describe('findAll', () => {
    let initialLocationData: Location[];
    beforeEach(async () => {
      initialLocationData = [
        {
            id: 1,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-00-00',
            spaceId: 1,
            space: {
                id: 1,
                createdAt: new Date('2022-08-28T16:54:54.642Z'),
                updatedAt: new Date('2022-08-28T16:54:54.642Z'),
                deletedAt: null,
                name: '용인-1섹터-입고대기',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 2,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-11',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 3,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-21',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 4,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-31',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 5,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-41',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 6,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-51',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 7,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-01-61',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 8,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-02-11',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 9,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-02-21',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        },
        {
            id: 10,
            createdAt: new Date('2022-09-01T09:49:44.857Z'),
            updatedAt: new Date('2022-09-01T09:49:44.857Z'),
            deletedAt: null,
            name: 'A01-02-31',
            spaceId: 2,
            space: {
                id: 2,
                createdAt: new Date('2022-08-28T16:55:01.502Z'),
                updatedAt: new Date('2022-08-28T16:55:01.502Z'),
                deletedAt: null,
                name: '용인-1섹터-입고',
                inputEnable: true,
                outputEnable: false,
                storeEnable: false
            }
        }
      ] as Location[];
    })
    it('정상처리: 지정페이지 조회되어야 함', async () => {
      //given
      const page = 2
      const pageSize = 3
      const startPoint = (Number(page) - 1) * Number(pageSize);
      const selectCount = Number(pageSize);
      const expectedLocations = initialLocationData.slice(startPoint, startPoint + selectCount);
      locationRepository.find = jest.fn().mockResolvedValue(expectedLocations);

      // when
      const foundLocations = await service.findAll(page, pageSize);

      //then
      expect(foundLocations?.length).toBe(expectedLocations?.length);
      for (let i = 0; i < foundLocations.length; i++) {
        expect(foundLocations[i]?.id).toBe(expectedLocations[i]?.id);
        expect(foundLocations[i]?.name).toBe(expectedLocations[i]?.name);
        expect(foundLocations[i]?.deletedAt).toEqual(expectedLocations[i]?.deletedAt);
        expect(foundLocations[i]?.createdAt).toEqual(expectedLocations[i]?.createdAt);
        expect(foundLocations[i]?.updatedAt).toEqual(expectedLocations[i]?.updatedAt);
        expect(foundLocations[i]?.spaceId).toBe(expectedLocations[i]?.spaceId);
        expect(foundLocations[i]?.space).toEqual(expectedLocations[i]?.space);
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
      const mockLocation = {
        id: 1,
        name: 'A01-11-11',
        spaceId: 1,
        deletedAt: null,
        createdAt: '2022-09-01T16:31:51.402Z',
        updatedAt: '2022-09-01T16:31:51.402Z',
        space: {
            id: 1,
            createdAt: '2022-08-28T16:54:54.642Z',
            updatedAt: '2022-08-28T16:54:54.642Z',
            deletedAt: null,
            name: '용인-1섹터-입고대기',
            inputEnable: true,
            outputEnable: false,
            storeEnable: false
        },
      }
      locationRepository.findOne = jest.fn().mockResolvedValue(mockLocation);

      //when
      const foundLocation = await service.findOneById(1);

      //then
      expect(foundLocation).toEqual(mockLocation);
    });

    it('에러발생: id의 데이터가 없는 경우', async () => {
      //given
      locationRepository.findOne = jest.fn().mockResolvedValue(null);
      const id = 1;
      //when
      //then
      try {
        const foundLocation = await service.findOneById(id);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe(`id: ${id} |해당 id의 location이 존재하지 않습니다.`);
      }
    });
  });

  describe('update', () => {
    it('정상처리: 실제 데이터베이스 변경되어야 함', async () => {
      //given
      const dummyLocation = {
          id: 1,
          createdAt: new Date('2022-09-01T09:49:44.857Z'),
          updatedAt: new Date('2022-09-01T09:49:44.857Z'),
          deletedAt: null,
          name: 'A01-00-00',
          spaceId: 1,
      } as Location;
      const insertedLocation = await locationRepository.save(dummyLocation);
      const updateId = insertedLocation.id;
      const updateLocation = {
        name: 'A99-44-44'
      }
      const expectedLocation = { ...insertedLocation, ...updateLocation };

      //when
      const updatedLocation = await service.update(updateId, updateLocation);
      const expectedUpdateAt = (await locationRepository.findOneBy({ id: expectedLocation.id }) as Location).updatedAt;

      // //then
      expect(updatedLocation).toBeDefined();
      expect(updatedLocation.id).toBe(expectedLocation.id);
      expect(updatedLocation.name).toBe(expectedLocation.name);
      expect(updatedLocation.spaceId).toBe(expectedLocation.spaceId);
      expect(updatedLocation.createdAt).toEqual(expectedLocation.createdAt);
      expect(updatedLocation.deletedAt).toEqual(expectedLocation.deletedAt);
      expect(updatedLocation.updatedAt).toEqual(expectedUpdateAt);
    });

    it('에러발생: id의 데이터가 없는 경우', async () => {
      //given
      const updateId = 1;
      const updateLocation = {
        name: 'A99-44-44'
      }
      
      //when
      //then
      try {
        const updateedLocation = await service.update(updateId, updateLocation);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe( `id: ${updateId} |해당 id의 location이 존재하지 않습니다.`);
      }
    });

    it('에러발생: 이미 동일한 name과 spaceId를 가진 데이터가 있는 경우', async () => {
      //given
      const dummyLocation1 = {
        id: 1,
        createdAt: new Date('2022-09-01T09:49:44.857Z'),
        updatedAt: new Date('2022-09-01T09:49:44.857Z'),
        deletedAt: null,
        name: 'A01-00-00',
        spaceId: 1,
      } as Location;
      const dummyLocation2 = {
        id: 2,
        createdAt: new Date('2022-09-01T09:49:44.857Z'),
        updatedAt: new Date('2022-09-01T09:49:44.857Z'),
        deletedAt: null,
        name: 'A01-00-01',
        spaceId: 1,
      } as Location;
      await locationRepository.save(dummyLocation1);
      const insertedLocation = await locationRepository.save(dummyLocation2);
      const updateId = insertedLocation.id;
      const updateLocation = {
        name: dummyLocation1.name,
        spaceId: dummyLocation1.spaceId
      }
      const expectedLocation = { ...insertedLocation, ...updateLocation };

      //when
      const updatedLocation = service.update(updateId, updateLocation);

      // //then
      const expectedError = new DatabaseError(DatabaseStatus.NOT_ALLOW_DUPLICATE, `name: ${expectedLocation.name} |spaceId: ${expectedLocation.id} |name과 spaceId가 같은 location이 이미 존재하여 수정할 수 없습니다.`);
      expect(updatedLocation).rejects.toEqual(expectedError);
      
    });
  });

  describe('remove', () => {
    it('정상처리: 실제 데이터베이스에서 삭제되어야 함', async () => {
      //given
      const dummyLocation = {
        id: 1,
        createdAt: new Date('2022-09-01T09:49:44.857Z'),
        updatedAt: new Date('2022-09-01T09:49:44.857Z'),
        deletedAt: null,
        name: 'A01-00-00',
        spaceId: 1,
      } as Location;
      let insertedLocation: Location = await locationRepository.save(dummyLocation);

      //when
      await service.remove(dummyLocation.id);

      //then
      const foundLocation = await locationRepository.findOneBy({ id: dummyLocation.id });
      expect(foundLocation).toBe(null);
    });
    
    it('에러발생: id의 데이터가 없는 경우', async () => {
      //given
      const removeId = 1;
      
      //when
      //then
      try {
        const removedSpace = await service.remove(removeId);
      } catch (e) {
        expect(e).toBeInstanceOf(DatabaseError);
        expect(e?.code).toBe(DatabaseStatus.NO_RESULT);
        expect(e?.describe).toBe(`id: ${removeId} |해당 id의 location이 존재하지 않습니다.`);
      }
    });
  });
});