import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  findRandom() {
    return this.quizService.findRandom();
  }

  @Get('get')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    console.log(id)
    return this.quizService.remove(id);
  }
}
