import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DictDocument = Dict & Document;


//몽고디비 Collection과 대응되는 Schema 
@Schema()
export class Dict { //class 명이 Dict이기 때문에 꼭! 필수적으로 몽고DB에서 Collection의 이름은 dicts여야함. 
    //class의 이름을 소문자로 바꾼 뒤 's'붙이기. 네이밍 규칙 존재하는 듯.

    @Prop()
    title: string;

    @Prop([[]])
    intro: [[]];

    @Prop([[]])
    content: [[]];

    @Prop()
    document: string;
}

export const DictSchema = SchemaFactory.createForClass(Dict);