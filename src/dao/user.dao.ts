import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../models/user.schema';
import { CreateUserDto } from '../validator/user.schema';

@Injectable()
class UserDAO {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      birthDate: new Date(createUserDto.birthDate),
    });
    return createdUser.save();
  }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

export { UserDAO };
