import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { QnaModule } from './qna/qna.module';
import { DictModule } from './dict/dict.module';
import { QuizModule } from './quiz/quiz.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.HOST_ADDRESS),
    DictModule,
    QuizModule,
    AdminModule,
    QnaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
