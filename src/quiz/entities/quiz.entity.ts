import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;


//몽고디비 quizs Collection과 대응되는 Quiz Schema 
@Schema()
export class Quiz {

    @Prop()
    context: string;

    @Prop()
    question: string;

    @Prop()
    start_index: number;

    @Prop()
    last_index: number;

    @Prop()
    answers: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);