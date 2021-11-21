import { IsString } from 'class-validator';

export class CreateAdminDto {
    @IsString()
    id: string;

    @IsString()
    pwd: string;

}
