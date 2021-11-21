import { IsString, IsArray } from 'class-validator';

export class CreateDictDto {
    @IsString()
    title: string;

    @IsArray()
    intro: [[]];

    @IsArray()
    content: [[]];

    @IsString()
    document: string;

    @IsString()
    search: string
}
