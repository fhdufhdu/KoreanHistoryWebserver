import { Controller, Get, Post, Req} from '@nestjs/common';
import { Request } from 'express'
import { AppService } from './app.service';

const http = require("http");
const options = {
  hostname: 'localhost',
  path: '/quiz/get_data',
  port: '3000',
  method: 'POST'
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('qna')
  async getAnswerForQuestion(@Req() request : Request ) {
    console.log(request.query)
    const json = { test: request.query.question }
    const req = await http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (body) => {
        console.log(body)
      })
    })
    req.end();
    return json;
  }

  @Post('quiz/get_data')
  getQuizData() {
    return "test"
  }

}
