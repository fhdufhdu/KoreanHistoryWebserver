import { Injectable, Req } from '@nestjs/common';
import { MethodInfo } from '../api';

@Injectable()
export class QnaService {
  private static requestPromise = require('request-promise');
  private static PYTHON_URI: string = 'http://202.31.202.147:5000/';

  getAnswerForQuestion(question) {
    const result = this.accessPythonSever(question);
    return result;
  }
  async accessPythonSever(question) {
    let result = null;
    const request_option = {
      uri: QnaService.PYTHON_URI,
      method: MethodInfo.POST,
      json: true,
      body: {
        question: question,
      },
    };
    await QnaService.requestPromise(request_option, async (err, res, body) => {
      result = body;
    });
    return result;
  }
}
