import { IsString, IsNumber } from 'class-validator';

export class CreateQuizDto {
    @IsString()
    context: string;

    @IsString()
    question: string;

    @IsNumber()
    start_index: number;

    @IsNumber()
    last_index: number;

    @IsString()
    answers: string;
}