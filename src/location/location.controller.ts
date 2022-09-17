import { PagenationQueryDto } from '@/common/dto/pagenation-query.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, getSchemaPath } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { ExcludeRelationLocation } from './dto/exclude-relation-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';

const LOCATION = 'location' as const;
@Controller(LOCATION)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ tags: [LOCATION], summary: '위치 생성', description: '위치을 생성합니다.' })
  @ApiBody({ type: CreateLocationDto })
  @ApiCreatedResponse({ type: ExcludeRelationLocation, description: '생성된 위치 정보' })
  create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ tags: [LOCATION], summary: '공간 페이지별 조회', description: '위치목록을 페이지로 조회합니다.' })
  @ApiOkResponse({
    description: '조회된 위치 목록',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(Location) }
    }
  })
  findAll(@Query() query: PagenationQueryDto): Promise<Array<Location>> {
    return this.locationService.findAll(query.page, query.pageSize);
  }

  @Get(':id')
  @ApiOperation({ tags: [LOCATION], summary: '위치 하나 조회', description: 'id에 해당하는 위치을 조회합니다.' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Location, description: '조회한 위치 정보' })
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ tags: [LOCATION], summary: '위치 수정', description: '기존에 있는 위치가 수정합니다.' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiOkResponse({ type: ExcludeRelationLocation, description: '수정된 위치 정보' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ tags: [LOCATION], summary: '위치 삭제', description: '기존에 있는 위치를 삭제합니다.' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.locationService.remove(id);
  }
}
