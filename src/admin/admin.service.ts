import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) { }

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async login(adminDto: CreateAdminDto) {
    const login = await this.adminModel.findOne({ id: adminDto.id, pwd: adminDto.pwd }).exec();
    var isSuccess = false
    if (login != null) {
      isSuccess = true;
    }
    return isSuccess;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
