import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { QnaService } from './qna.service';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Get('answer')
  async getAnswerForQuestion(@Req() request: Request) {
    const question = request.query.question;
    console.log(question);
    const result = this.qnaService.getAnswerForQuestion(question);
    return result;
  }
}
