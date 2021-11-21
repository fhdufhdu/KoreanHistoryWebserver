import { Controller, Get, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';

@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) { }

  @Post()
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  //주소: http://192.168.0.114:3000/dict?type=가&page=1
  @Get()
  async findAll(@Query("category") category: string, @Query("page") page: number) {
    return this.dictService.findDict(category, page);
  }
  //ex) http://192.168.0.114:3000/dict/세종 위의 함수 실행X 바로 이 주소로 올 것 (Warning)
  @Get('search')
  findOne(@Query('query') query: string) {
    return this.dictService.findOne(query);
  }

  @Get('title')
  findByTtitle(@Query('query') query: string) {
    return this.dictService.findByTitle(query);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(id, updateDictDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.dictService.remove(id);
  }
}
