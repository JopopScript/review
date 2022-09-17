import { CustomSpaceRepository } from '@/space/repository/custom-space.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

describe('SpaceController', () => {
  let controller: SpaceController;
  let service: SpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceController],
      providers: [
        SpaceService,
        {
          provide: getRepositoryToken(CustomSpaceRepository),
          useValue: jest.mock('@/space/repository/custom-space.repository'),
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource
        },
      ],
    }).compile();
    
    controller = module.get(SpaceController);
    service = module.get(SpaceService);
  });

  it('create', async () => {
    const request = {
      name:'용인1섹터입고',
      inputEnable: true,
      outputEnable: false,
      storeEnable: false
    };

    service.create = jest.fn();

    await controller.create(request);

    expect(service.create).toBeCalledTimes(1);
  })

  it('findAll', async () => {
    //given
    service.findAll = jest.fn();
    const pagenationQueryDto = { page: 1, pageSize: 2 };

    //when
    const response = await controller.findAll(pagenationQueryDto);
    
    //then
    expect(service.findAll).toBeCalledTimes(1);
  });

  it('findOneById', async () => {
    //given
    const requestParam = '1' as any;
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
      name:'용인1섹터입고',
      inputEnable: true,
      outputEnable: false,
      storeEnable: false
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
