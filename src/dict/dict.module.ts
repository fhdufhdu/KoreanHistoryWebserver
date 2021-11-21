import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { Dict, DictSchema } from './entities/dict.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dict.name, schema: DictSchema }])], //Dict.name == Dict클래스의 멤버 변수 name이 아님! 기억할 것. 클래스 이름을 가져온다던가 어쨌든 다른거인듯 
  controllers: [DictController],
  providers: [DictService]
})
export class DictModule { }
