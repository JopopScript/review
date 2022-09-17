import { PagenationQueryDto } from '@/common/dto/pagenation-query.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, getSchemaPath } from '@nestjs/swagger';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';
import { SpaceService } from './space.service';

const SPACE = 'space' as const;
@Controller(SPACE)
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @ApiOperation({ tags: [SPACE], summary: '공간 생성', description: '공간을 생성합니다.' })
  @ApiBody({ type: CreateSpaceDto })
  @ApiCreatedResponse({ type: Space, description: '생성된 공간 정보' })
  // @ApiBadRequestResponse({ type: Space, description: '' })
  create(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return this.spaceService.create(createSpaceDto);
  }

  @Get()
  @ApiOperation({ tags: [SPACE], summary: '공간 페이지별 조회', description: '공간목록을 페이지로 조회합니다.' })
  @ApiOkResponse({
    description: '조회된 공간 목록',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(Space) }
    }
  })
  findAll(@Query() query: PagenationQueryDto): Promise<Array<Space>> {
    return this.spaceService.findAll(query.page, query.pageSize);
  }

  @Get(':id')
  @ApiOperation({ tags: [SPACE], summary: '공간 하나 조회', description: 'id에 해당하는 공간을 조회합니다.' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Space, description: '조회된 공간 정보' })
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Space> {
    return this.spaceService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ tags: [SPACE], summary: '공간 수정', description: '기존에 있는 공간을 수정합니다.' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateSpaceDto })
  @ApiOkResponse({ type: Space, description: '수정된 공간 정보' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSpaceDto: UpdateSpaceDto): Promise<Space> {
    return this.spaceService.update(id, updateSpaceDto);
  }

  @Delete(':id')
  @ApiOperation({ tags: [SPACE], summary: '공간 삭제', description: '기존에 있는 공간을 삭제합니다.' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.spaceService.remove(id);
  }
}
