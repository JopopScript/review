import { CustomSpaceRepository } from "@/space/repository/custom-space.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import { CustomLocationRepository } from "./repository/custom-location.repository";

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(CustomSpaceRepository),
          useValue: jest.mock('@/space/repository/custom-space.repository'),
        },
        {
          provide: getRepositoryToken(CustomLocationRepository),
          useValue: jest.mock('@/location/repository/custom-location.repository'),
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource
        },
      ],
    }).compile();

    controller = module.get(LocationController);
    service = module.get(LocationService);
  });
  
  it('create', async () => {
    //given
    const request = {
      name:'A01-11-11',
      spaceId: 1
    };
    service.create = jest.fn();

    //when
    await controller.create(request);

    //then
    expect(service.create).toBeCalledTimes(1);
  })

  it('findAll', async () => {
    //given
    service.findAll = jest.fn();
    const pagenationQueryDto = { page: 3, pageSize: 5 };

    //when
    const response = await controller.findAll(pagenationQueryDto);
    
    //then
    expect(service.findAll).toBeCalledTimes(1);
  });

  it('findOneById', async () => {
    //given
    const requestParam = '15' as any;
    service.findOneById = jest.fn();

    //when
    const response = await controller.findOneById(requestParam);
    
    //then
    expect(service.findOneById).toBeCalledTimes(1);
  });

  it('update', async () => {
    // given
    const requestParam = '1' as any;
    const requestBody = {
      name:'A01-11-99',
      spaceId: 1
    };
    service.update = jest.fn();

    //when
    const response = await controller.update(requestParam, requestBody);

    //then
    expect(service.update).toBeCalledTimes(1);
  });

  it('remove', async () => {
    //given
    const requestParam = '1' as any;
    service.remove = jest.fn();

    //when
    const response = await controller.remove(requestParam);
    
    //then
    expect(service.remove).toBeCalledTimes(1);
  });
});